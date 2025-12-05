import Colors from "@/constants/colors";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "expo-router";
import { Bell, Calendar, ChevronRight, Heart, LogOut, Settings, User } from "lucide-react-native";
import React from "react";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const router = useRouter();
  const { favorites, getConfirmedBookings } = useUser();
  const confirmedBookings = getConfirmedBookings();

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <User color={Colors.primary} size={32} />
            <Text style={styles.headerTitle}>Profil</Text>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              <Image
                source={{ uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop" }}
                style={styles.profileImage}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileEmail}>john.doe@example.com</Text>
          </View>

          <View style={styles.statsSection}>
            <View style={styles.statCard}>
              <Calendar color={Colors.primary} size={24} />
              <Text style={styles.statNumber}>{confirmedBookings.length}</Text>
              <Text style={styles.statLabel}>Réservations</Text>
            </View>
            <View style={styles.statCard}>
              <Heart color={Colors.primary} size={24} />
              <Text style={styles.statNumber}>{favorites.length}</Text>
              <Text style={styles.statLabel}>Favoris</Text>
            </View>
          </View>

          <View style={styles.menuSection}>
            <Text style={styles.sectionTitle}>Paramètres</Text>
            
            <Pressable style={styles.menuItem} onPress={() => router.push('/profile/personal-info' as any)}>
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIcon}>
                  <User color={Colors.primary} size={20} />
                </View>
                <Text style={styles.menuItemText}>Informations personnelles</Text>
              </View>
              <ChevronRight color={Colors.textMuted} size={20} />
            </Pressable>

            <Pressable style={styles.menuItem} onPress={() => router.push('/profile/notifications' as any)}>
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIcon}>
                  <Bell color={Colors.primary} size={20} />
                </View>
                <Text style={styles.menuItemText}>Notifications</Text>
              </View>
              <ChevronRight color={Colors.textMuted} size={20} />
            </Pressable>

            <Pressable style={styles.menuItem} onPress={() => router.push('/profile/favorites' as any)}>
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIcon}>
                  <Heart color={Colors.primary} size={20} />
                </View>
                <Text style={styles.menuItemText}>Mes favoris</Text>
              </View>
              <ChevronRight color={Colors.textMuted} size={20} />
            </Pressable>

            <Pressable style={styles.menuItem} onPress={() => router.push('/profile/bookings' as any)}>
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIcon}>
                  <Calendar color={Colors.primary} size={20} />
                </View>
                <Text style={styles.menuItemText}>Historique des réservations</Text>
              </View>
              <ChevronRight color={Colors.textMuted} size={20} />
            </Pressable>

            <Pressable style={styles.menuItem} onPress={() => router.push('/profile/settings' as any)}>
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIcon}>
                  <Settings color={Colors.primary} size={20} />
                </View>
                <Text style={styles.menuItemText}>Paramètres</Text>
              </View>
              <ChevronRight color={Colors.textMuted} size={20} />
            </Pressable>
          </View>

          <Pressable
            style={styles.logoutButton}
            onPress={() => router.replace("/signin" as any)}
          >
            <LogOut color="#FF3B30" size={20} />
            <Text style={styles.logoutText}>Déconnexion</Text>
          </Pressable>
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
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "700" as const,
    color: Colors.text,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  profileSection: {
    alignItems: "center" as const,
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  profileImageContainer: {
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.surface,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: Colors.textMuted,
  },
  statsSection: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 20,
    alignItems: "center" as const,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: "700" as const,
    color: Colors.text,
    marginTop: 12,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  menuSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center" as const,
    gap: 12,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background,
    justifyContent: "center" as const,
    alignItems: "center" as const,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: Colors.text,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center" as const,
    justifyContent: "center" as const,
    gap: 8,
    marginHorizontal: 20,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#FF3B30",
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "#FF3B30",
  },
});
