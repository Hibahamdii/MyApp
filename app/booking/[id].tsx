import Colors from "@/constants/colors";
import { foodItems } from "@/mocks/movies";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Calendar, Clock, CreditCard, MapPin, Minus, Plus } from "lucide-react-native";
import React, { useMemo, useState } from "react";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BookingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    id: string;
    movieTitle: string;
    cinemaName: string;
    time: string;
    date: string;
    room: string;
    price: string;
  }>();

  const [selectedSeats, setSelectedSeats] = useState<number>(1);
  const [selectedFood, setSelectedFood] = useState<Record<string, number>>({});

  const price = parseFloat(params.price || "12");
  
  const foodTotal = useMemo(() => {
    return Object.entries(selectedFood).reduce((sum, [foodId, quantity]) => {
      const item = foodItems.find((f: any) => f.id === foodId);
      return sum + (item ? item.price * quantity : 0);
    }, 0);
  }, [selectedFood]);

  const totalPrice = price * selectedSeats + foodTotal;

  const handleAddFood = (foodId: string) => {
    setSelectedFood((prev) => ({
      ...prev,
      [foodId]: (prev[foodId] || 0) + 1,
    }));
  };

  const handleRemoveFood = (foodId: string) => {
    setSelectedFood((prev) => {
      const newQuantity = (prev[foodId] || 0) - 1;
      if (newQuantity <= 0) {
        const { [foodId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [foodId]: newQuantity };
    });
  };

  const handleProceedToPayment = () => {
    const movieId = params.id?.split('-')[0] || '';
    router.push({
      pathname: "/payment",
      params: {
        movieId,
        movieTitle: params.movieTitle,
        cinemaName: params.cinemaName,
        time: params.time,
        date: params.date,
        room: params.room,
        seats: selectedSeats,
        total: totalPrice.toFixed(2),
        foodItems: selectedFood,
      },
    } as any);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft color={Colors.text} size={24} />
          </Pressable>
          <Text style={styles.headerTitle}>Réservation</Text>
          <View style={{ width: 40 }} />
        </View>
      </SafeAreaView>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.movieTitle}>{params.movieTitle}</Text>
            
            <View style={styles.detailsContainer}>
              <View style={styles.detailRow}>
                <MapPin color={Colors.primary} size={20} />
                <Text style={styles.detailText}>{params.cinemaName}</Text>
              </View>

              <View style={styles.detailRow}>
                <Calendar color={Colors.primary} size={20} />
                <Text style={styles.detailText}>
                  {new Date(params.date).toLocaleDateString("fr-FR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Clock color={Colors.primary} size={20} />
                <Text style={styles.detailText}>{params.time}</Text>
              </View>

              <View style={styles.detailRow}>
                <CreditCard color={Colors.primary} size={20} />
                <Text style={styles.detailText}>Salle {params.room}</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nombre de places</Text>
            <View style={styles.seatsSelector}>
              {[1, 2, 3, 4, 5, 6].map((num: number) => (
                <Pressable
                  key={num}
                  style={[
                    styles.seatButton,
                    selectedSeats === num && styles.seatButtonActive,
                  ]}
                  onPress={() => setSelectedSeats(num)}
                >
                  <Text
                    style={[
                      styles.seatButtonText,
                      selectedSeats === num && styles.seatButtonTextActive,
                    ]}
                  >
                    {num}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Snacks & Boissons</Text>
            <View style={styles.foodGrid}>
              {foodItems.map((item: any) => {
                const quantity = selectedFood[item.id] || 0;
                return (
                  <View key={item.id} style={styles.foodCard}>
                    <Image
                      source={{ uri: item.image }}
                      style={styles.foodImage}
                      resizeMode="cover"
                    />
                    <View style={styles.foodInfo}>
                      <Text style={styles.foodName} numberOfLines={1}>
                        {item.name}
                      </Text>
                      <Text style={styles.foodPrice}>{item.price.toFixed(2)} €</Text>
                    </View>
                    <View style={styles.foodControls}>
                      {quantity > 0 ? (
                        <>
                          <Pressable
                            style={styles.foodButton}
                            onPress={() => handleRemoveFood(item.id)}
                          >
                            <Minus color={Colors.primary} size={16} />
                          </Pressable>
                          <Text style={styles.foodQuantity}>{quantity}</Text>
                          <Pressable
                            style={styles.foodButton}
                            onPress={() => handleAddFood(item.id)}
                          >
                            <Plus color={Colors.primary} size={16} />
                          </Pressable>
                        </>
                      ) : (
                        <Pressable
                          style={styles.foodAddButton}
                          onPress={() => handleAddFood(item.id)}
                        >
                          <Text style={styles.foodAddButtonText}>Ajouter</Text>
                        </Pressable>
                      )}
                    </View>
                  </View>
                );
              })}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Récapitulatif</Text>
            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Places sélectionnées</Text>
                <Text style={styles.summaryValue}>{selectedSeats}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Prix unitaire</Text>
                <Text style={styles.summaryValue}>{price.toFixed(2)} €</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Sous-total billets</Text>
                <Text style={styles.summaryValue}>{(price * selectedSeats).toFixed(2)} €</Text>
              </View>
              {foodTotal > 0 && (
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Snacks & Boissons</Text>
                  <Text style={styles.summaryValue}>{foodTotal.toFixed(2)} €</Text>
                </View>
              )}
              <View style={styles.divider} />
              <View style={styles.summaryRow}>
                <Text style={styles.summaryTotalLabel}>Total</Text>
                <Text style={styles.summaryTotalValue}>
                  {totalPrice.toFixed(2)} €
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <View>
            <Text style={styles.footerLabel}>Total à payer</Text>
            <Text style={styles.footerPrice}>{totalPrice.toFixed(2)} €</Text>
          </View>
          <Pressable style={styles.payButton} onPress={handleProceedToPayment}>
            <Text style={styles.payButtonText}>Procéder au paiement</Text>
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
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  movieTitle: {
    fontSize: 22,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 20,
  },
  detailsContainer: {
    gap: 16,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  detailText: {
    fontSize: 15,
    color: Colors.textSecondary,
    flex: 1,
    textTransform: "capitalize",
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
  seatsSelector: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  seatButton: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  seatButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  seatButtonText: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.textSecondary,
  },
  seatButtonTextActive: {
    color: Colors.text,
  },
  summaryCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 15,
    color: Colors.textSecondary,
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: "600" as const,
    color: Colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 8,
  },
  summaryTotalLabel: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.text,
  },
  summaryTotalValue: {
    fontSize: 22,
    fontWeight: "700" as const,
    color: Colors.primary,
  },
  foodGrid: {
    gap: 12,
  },
  foodCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 12,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  foodImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: Colors.background,
  },
  foodInfo: {
    flex: 1,
    marginLeft: 12,
  },
  foodName: {
    fontSize: 15,
    fontWeight: "600" as const,
    color: Colors.text,
    marginBottom: 4,
  },
  foodPrice: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: Colors.primary,
  },
  foodControls: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 8,
  },
  foodButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.background,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  foodQuantity: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: Colors.text,
    minWidth: 24,
    textAlign: "center" as const,
  },
  foodAddButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  foodAddButtonText: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: Colors.text,
  },
  footer: {
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  footerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 40,
  },
  footerLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  footerPrice: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: Colors.text,
  },
  payButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  payButtonText: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: Colors.text,
  },
});
