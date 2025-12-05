import Colors from "@/constants/colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import { CheckCircle } from "lucide-react-native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SuccessScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    movieTitle: string;
    cinemaName: string;
    time: string;
    date: string;
    room: string;
    seats: string;
    total: string;
  }>();

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <CheckCircle color={Colors.success} size={80} fill={Colors.success} />
          </View>

          <Text style={styles.title}>Réservation confirmée !</Text>
          <Text style={styles.subtitle}>
            Votre paiement a été traité avec succès
          </Text>

          <View style={styles.ticketCard}>
            <Text style={styles.ticketTitle}>Votre billet</Text>
            
            <View style={styles.ticketDivider} />

            <View style={styles.ticketInfo}>
              <View style={styles.ticketRow}>
                <Text style={styles.ticketLabel}>Film</Text>
                <Text style={styles.ticketValue}>{params.movieTitle}</Text>
              </View>

              <View style={styles.ticketRow}>
                <Text style={styles.ticketLabel}>Cinéma</Text>
                <Text style={styles.ticketValue}>{params.cinemaName}</Text>
              </View>

              <View style={styles.ticketRow}>
                <Text style={styles.ticketLabel}>Date</Text>
                <Text style={styles.ticketValue}>
                  {new Date(params.date).toLocaleDateString("fr-FR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </Text>
              </View>

              <View style={styles.ticketRow}>
                <Text style={styles.ticketLabel}>Heure</Text>
                <Text style={styles.ticketValue}>{params.time}</Text>
              </View>

              <View style={styles.ticketRow}>
                <Text style={styles.ticketLabel}>Salle</Text>
                <Text style={styles.ticketValue}>{params.room}</Text>
              </View>

              <View style={styles.ticketRow}>
                <Text style={styles.ticketLabel}>Places</Text>
                <Text style={styles.ticketValue}>{params.seats}</Text>
              </View>
            </View>

            <View style={styles.ticketDivider} />

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total payé</Text>
              <Text style={styles.totalValue}>{params.total} €</Text>
            </View>
          </View>

          <Text style={styles.infoText}>
            Un e-mail de confirmation vous a été envoyé
          </Text>
        </View>

        <View style={styles.footer}>
          <Pressable
            style={styles.button}
            onPress={() => router.replace("/")}
          >
            <Text style={styles.buttonText}>Retour à l&apos;accueil</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700" as const,
    color: Colors.text,
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: "center",
    marginBottom: 32,
  },
  ticketCard: {
    width: "100%",
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 24,
  },
  ticketTitle: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: Colors.text,
    textAlign: "center",
    marginBottom: 20,
  },
  ticketDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 16,
  },
  ticketInfo: {
    gap: 16,
  },
  ticketRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  ticketLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: "600" as const,
  },
  ticketValue: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: "600" as const,
    textAlign: "right",
    flex: 1,
    marginLeft: 16,
    textTransform: "capitalize",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.text,
  },
  totalValue: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: Colors.primary,
  },
  infoText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: Colors.text,
  },
});
