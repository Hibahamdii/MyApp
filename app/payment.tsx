import Colors from "@/constants/colors";
import { useUser } from "@/contexts/UserContext";
import { foodItems } from "@/mocks/movies";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, CreditCard, Lock } from "lucide-react-native";
import React, { useMemo, useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PaymentScreen() {
  const router = useRouter();
  const { addBooking } = useUser();
  const params = useLocalSearchParams<{
    movieTitle: string;
    cinemaName: string;
    time: string;
    date: string;
    room: string;
    seats: string;
    total: string;
    foodItems?: string;
    movieId?: string;
  }>();

  const selectedFood = useMemo(() => {
    if (!params.foodItems) return {};
    try {
      return JSON.parse(params.foodItems) as Record<string, number>;
    } catch {
      return {};
    }
  }, [params.foodItems]);

  const foodExtras = useMemo(() => {
    return Object.entries(selectedFood)
      .map(([foodId, quantity]) => {
        const item = foodItems.find((f) => f.id === foodId);
        if (!item || quantity <= 0) return null;
        return {
          ...item,
          quantity,
        };
      })
      .filter(Boolean) as { id: string; name: string; price: number; quantity: number }[];
  }, [selectedFood]);

  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [cardHolder, setCardHolder] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      addBooking({
        movieId: params.movieId || '',
        movieTitle: params.movieTitle,
        cinemaName: params.cinemaName,
        time: params.time,
        date: params.date,
        room: params.room,
        seats: parseInt(params.seats || '1'),
        total: parseFloat(params.total || '0'),
        foodItems: selectedFood,
      });
      
      setIsProcessing(false);
      router.replace({
        pathname: "/success",
        params: {
          movieTitle: params.movieTitle,
          cinemaName: params.cinemaName,
          time: params.time,
          date: params.date,
          room: params.room,
          seats: params.seats,
          total: params.total,
          foodItems: params.foodItems,
        },
      } as any);
    }, 2000);
  };

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s/g, "");
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
    setCardNumber(formatted);
  };

  const formatExpiryDate = (text: string) => {
    const cleaned = text.replace(/\//g, "");
    if (cleaned.length >= 2) {
      setExpiryDate(cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4));
    } else {
      setExpiryDate(cleaned);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft color={Colors.text} size={24} />
          </Pressable>
          <Text style={styles.headerTitle}>Paiement</Text>
          <View style={{ width: 40 }} />
        </View>
      </SafeAreaView>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.securityBadge}>
            <Lock color={Colors.success} size={16} />
            <Text style={styles.securityText}>Paiement 100% sécurisé</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Récapitulatif</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Film</Text>
              <Text style={styles.summaryValue}>{params.movieTitle}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Cinéma</Text>
              <Text style={styles.summaryValue}>{params.cinemaName}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Date & Heure</Text>
              <Text style={styles.summaryValue}>
                {new Date(params.date).toLocaleDateString("fr-FR")} à{" "}
                {params.time}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Places</Text>
              <Text style={styles.summaryValue}>{params.seats}</Text>
            </View>
            {foodExtras.length > 0 && (
              <>
                <View style={styles.divider} />
                <Text style={styles.extrasTitle}>Snacks & Boissons</Text>
                {foodExtras.map((extra) => (
                  <View key={extra.id} style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>
                      {extra.name} x{extra.quantity}
                    </Text>
                    <Text style={styles.summaryValue}>
                      {(extra.price * extra.quantity).toFixed(2)} €
                    </Text>
                  </View>
                ))}
              </>
            )}
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{params.total} €</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informations de paiement</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Titulaire de la carte</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Jean Dupont"
                  placeholderTextColor={Colors.textMuted}
                  value={cardHolder}
                  onChangeText={setCardHolder}
                  autoCapitalize="words"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Numéro de carte</Text>
              <View style={styles.inputContainer}>
                <CreditCard color={Colors.textSecondary} size={20} />
                <TextInput
                  style={styles.input}
                  placeholder="1234 5678 9012 3456"
                  placeholderTextColor={Colors.textMuted}
                  value={cardNumber}
                  onChangeText={formatCardNumber}
                  keyboardType="number-pad"
                  maxLength={19}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.inputLabel}>Date d&apos;expiration</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="MM/AA"
                    placeholderTextColor={Colors.textMuted}
                    value={expiryDate}
                    onChangeText={formatExpiryDate}
                    keyboardType="number-pad"
                    maxLength={5}
                  />
                </View>
              </View>

              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.inputLabel}>CVV</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="123"
                    placeholderTextColor={Colors.textMuted}
                    value={cvv}
                    onChangeText={setCvv}
                    keyboardType="number-pad"
                    maxLength={3}
                    secureTextEntry
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <Pressable
            style={[
              styles.payButton,
              isProcessing && styles.payButtonDisabled,
            ]}
            onPress={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <ActivityIndicator color={Colors.text} />
            ) : (
              <Text style={styles.payButtonText}>
                Payer {params.total} €
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeArea: {
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: Colors.text,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  securityBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: Colors.surface,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.success + "33",
  },
  securityText: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: Colors.success,
  },
  summaryCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: Colors.text,
    textAlign: "right",
    flex: 1,
    marginLeft: 16,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: Colors.text,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: Colors.primary,
  },
  extrasTitle: {
    fontSize: 14,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 8,
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: Colors.text,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  footer: {
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  footerContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 40,
  },
  payButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  payButtonDisabled: {
    opacity: 0.7,
  },
  payButtonText: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.text,
  },
});
