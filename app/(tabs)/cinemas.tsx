import Colors from "@/constants/colors";
import { cinemas } from "@/mocks/movies";
import { MapPin, Navigation } from "lucide-react-native";
import React, { useState } from "react";
import {
    Linking,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CinemasScreen() {
  const [selectedCinema, setSelectedCinema] = useState<string | null>(null);

  const openMaps = (address: string) => {
    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q=",
      web: "https://www.google.com/maps/search/?api=1&query=",
    });
    const url = Platform.select({
      ios: `${scheme}${address}`,
      android: `${scheme}${address}`,
      web: `${scheme}${encodeURIComponent(address)}`,
    });

    if (url) {
      Linking.openURL(url);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <MapPin color={Colors.primary} size={32} />
            <Text style={styles.headerTitle}>Cinémas</Text>
          </View>
          <Text style={styles.headerSubtitle}>Trouvez le cinéma le plus proche</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.mapPlaceholder}>
            <MapPin color={Colors.primary} size={48} />
            <Text style={styles.mapText}>Carte interactive des cinémas</Text>
            <Text style={styles.mapSubtext}>
              {cinemas.length} cinémas trouvés près de vous
            </Text>
          </View>

          <View style={styles.cinemasSection}>
            <Text style={styles.sectionTitle}>Tous les cinémas</Text>
            {cinemas.map((cinema: any) => (
              <Pressable
                key={cinema.id}
                style={[
                  styles.cinemaCard,
                  selectedCinema === cinema.id && styles.cinemaCardSelected,
                ]}
                onPress={() => setSelectedCinema(cinema.id)}
              >
                <View style={styles.cinemaIcon}>
                  <MapPin color={Colors.primary} size={24} />
                </View>
                <View style={styles.cinemaInfo}>
                  <Text style={styles.cinemaName}>{cinema.name}</Text>
                  <Text style={styles.cinemaAddress}>{cinema.address}</Text>
                  <Text style={styles.cinemaDistance}>📍 {cinema.distance}</Text>
                </View>
                <Pressable
                  style={styles.navigationButton}
                  onPress={() => openMaps(cinema.address)}
                >
                  <Navigation color={Colors.primary} size={20} />
                </Pressable>
              </Pressable>
            ))}
          </View>
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center" as const,
    gap: 12,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "700" as const,
    color: Colors.text,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginLeft: 44,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  mapPlaceholder: {
    marginHorizontal: 20,
    marginBottom: 32,
    height: 200,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  mapText: {
    fontSize: 18,
    fontWeight: "600" as const,
    color: Colors.text,
    marginTop: 16,
  },
  mapSubtext: {
    fontSize: 14,
    color: Colors.textMuted,
    marginTop: 8,
  },
  cinemasSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 16,
  },
  cinemaCard: {
    flexDirection: "row",
    alignItems: "center" as const,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cinemaCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.surface,
  },
  cinemaIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.background,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    marginRight: 12,
  },
  cinemaInfo: {
    flex: 1,
  },
  cinemaName: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: Colors.text,
    marginBottom: 4,
  },
  cinemaAddress: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  cinemaDistance: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  navigationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background,
    justifyContent: "center" as const,
    alignItems: "center" as const,
  },
});
