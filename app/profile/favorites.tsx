import Colors from "@/constants/colors";
import { useUser } from "@/contexts/UserContext";
import { movies } from "@/mocks/movies";
import { useRouter } from "expo-router";
import { ArrowLeft, Heart } from "lucide-react-native";
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

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites, toggleFavorite } = useUser();

  const favoriteMovies = movies.filter((movie: any) => favorites.includes(movie.id));

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft color={Colors.text} size={24} />
          </Pressable>
          <Text style={styles.headerTitle}>Mes Favoris</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {favoriteMovies.length === 0 ? (
            <View style={styles.emptyState}>
              <Heart color={Colors.textMuted} size={64} />
              <Text style={styles.emptyTitle}>Aucun favori</Text>
              <Text style={styles.emptyText}>
                Ajoutez des films à vos favoris pour les retrouver ici
              </Text>
            </View>
          ) : (
            <View style={styles.moviesGrid}>
              {favoriteMovies.map((movie: any) => (
                <View key={movie.id} style={styles.movieCard}>
                  <Pressable
                    onPress={() => router.push(`/movie/${movie.id}` as any)}
                  >
                    <Image
                      source={{ uri: movie.poster }}
                      style={styles.moviePoster}
                      resizeMode="cover"
                    />
                  </Pressable>
                  
                  <Pressable
                    style={styles.favoriteButton}
                    onPress={() => toggleFavorite(movie.id)}
                  >
                    <Heart
                      color={Colors.primary}
                      size={20}
                      fill={Colors.primary}
                    />
                  </Pressable>

                  <View style={styles.movieInfo}>
                    <Text style={styles.movieTitle} numberOfLines={1}>
                      {movie.title}
                    </Text>
                    <Text style={styles.movieGenre} numberOfLines={1}>
                      {movie.genre.join(", ")}
                    </Text>
                    <View style={styles.ratingRow}>
                      <Text style={styles.ratingText}>⭐ {movie.rating}</Text>
                    </View>
                  </View>
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
  moviesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -8,
  },
  movieCard: {
    width: "50%",
    padding: 8,
  },
  moviePoster: {
    width: "100%",
    aspectRatio: 2 / 3,
    borderRadius: 12,
    backgroundColor: Colors.surface,
  },
  favoriteButton: {
    position: "absolute" as const,
    top: 16,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  movieInfo: {
    marginTop: 8,
  },
  movieTitle: {
    fontSize: 15,
    fontWeight: "600" as const,
    color: Colors.text,
    marginBottom: 4,
  },
  movieGenre: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center" as const,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: "600" as const,
    color: Colors.text,
  },
});
