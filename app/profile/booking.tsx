import Colors from "@/constants/colors";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "expo-router";
import { ArrowLeft, Calendar, CheckCircle, Clock, MapPin, X } from "lucide-react-native";
import React from "react";
import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BookingsScreen() {
  const router = useRouter();
  const { getAllBookings, cancelBooking } = useUser();
  const allBookings = getAllBookings();

  const handleCancelBooking = (bookingId: string, movieTitle: string) => {
    Alert.alert(
      "Annuler la réservation",
      `Êtes-vous sûr de vouloir annuler votre réservation pour "${movieTitle}" ?`,
      [
        {
          text: "Non",
          style: "cancel",
        },
        {
          text: "Oui, annuler",
          style: "destructive",
          onPress: () => {
            cancelBooking(bookingId);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft color={Colors.text} size={24} />
          </Pressable>
          <Text style={styles.headerTitle}>Mes Réservations</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {allBookings.length === 0 ? (
            <View style={styles.emptyState}>
              <Calendar color={Colors.textMuted} size={64} />
              <Text style={styles.emptyTitle}>Aucune réservation</Text>
              <Text style={styles.emptyText}>
                Vos réservations apparaîtront ici
              </Text>
            </View>
          ) : (
            <View style={styles.bookingsList}>
              {allBookings.map((booking: any) => (
                <View key={booking.id} style={styles.bookingCard}>
                  <View style={styles.bookingHeader}>
                    <Text style={styles.movieTitle}>{booking.movieTitle}</Text>
                    {booking.status === "confirmed" ? (
                      <View style={styles.statusBadgeConfirmed}>
                        <CheckCircle color={Colors.primary} size={16} />
                        <Text style={styles.statusTextConfirmed}>Confirmée</Text>
                      </View>
                    ) : (
                      <View style={styles.statusBadgeCancelled}>
                        <X color="#FF3B30" size={16} />
                        <Text style={styles.statusTextCancelled}>Annulée</Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.bookingDetails}>
                    <View style={styles.detailRow}>
                      <MapPin color={Colors.textSecondary} size={16} />
                      <Text style={styles.detailText}>{booking.cinemaName}</Text>
                    </View>

                    <View style={styles.detailRow}>
                      <Calendar color={Colors.textSecondary} size={16} />
                      <Text style={styles.detailText}>
                        {new Date(booking.date).toLocaleDateString("fr-FR", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                        })}
                      </Text>
                    </View>

                    <View style={styles.detailRow}>
                      <Clock color={Colors.textSecondary} size={16} />
                      <Text style={styles.detailText}>
                        {booking.time} • Salle {booking.room}
                      </Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.summaryRow}>
                      <Text style={styles.summaryLabel}>Places</Text>
                      <Text style={styles.summaryValue}>{booking.seats}</Text>
                    </View>

                    <View style={styles.summaryRow}>
                      <Text style={styles.summaryTotalLabel}>Total</Text>
                      <Text style={styles.summaryTotalValue}>
                        {booking.total.toFixed(2)} €
                      </Text>
                    </View>
                  </View>

                  {booking.status === "confirmed" && (
                    <Pressable
                      style={styles.cancelButton}
                      onPress={() =>
                        handleCancelBooking(booking.id, booking.movieTitle)
                      }
                    >
                      <X color="#FF3B30" size={18} />
                      <Text style={styles.cancelButtonText}>
                        Annuler la réservation
                      </Text>
                    </Pressable>
                  )}
                </View>
              ))}
            </View>
          )}
        </ScrollView>
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
  scrollContent: {
    padding: 20,
  },
  emptyState: {
    alignItems: "center" as const,
    justifyContent: "center" as const,
    paddingVertical: 80,
    gap: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: Colors.text,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: "center" as const,
    paddingHorizontal: 40,
  },
  bookingsList: {
    gap: 16,
  },
  bookingCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  bookingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center" as const,
    marginBottom: 16,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.text,
    flex: 1,
  },
  statusBadgeConfirmed: {
    flexDirection: "row",
    alignItems: "center" as const,
    gap: 6,
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusTextConfirmed: {
    fontSize: 13,
    fontWeight: "600" as const,
    color: Colors.primary,
  },
  statusBadgeCancelled: {
    flexDirection: "row",
    alignItems: "center" as const,
    gap: 6,
    backgroundColor: "rgba(255, 59, 48, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusTextCancelled: {
    fontSize: 13,
    fontWeight: "600" as const,
    color: "#FF3B30",
  },
  bookingDetails: {
    gap: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center" as const,
    gap: 12,
  },
  detailText: {
    fontSize: 15,
    color: Colors.textSecondary,
    textTransform: "capitalize" as const,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 8,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center" as const,
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
  summaryTotalLabel: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.text,
  },
  summaryTotalValue: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: Colors.primary,
  },
  cancelButton: {
    flexDirection: "row",
    alignItems: "center" as const,
    justifyContent: "center" as const,
    gap: 8,
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "rgba(255, 59, 48, 0.1)",
    borderWidth: 1,
    borderColor: "#FF3B30",
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: "600" as const,
    color: "#FF3B30",
  },
});
