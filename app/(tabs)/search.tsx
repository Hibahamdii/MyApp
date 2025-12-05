import Colors from "@/constants/colors";
import { movies } from "@/mocks/movies";
import { useRouter } from "expo-router";
import { Search as SearchIcon } from "lucide-react-native";
import React, { useState } from "react";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredMovies = movies.filter((movie: any) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <SearchIcon color={Colors.primary} size={32} />
            <Text style={styles.headerTitle}>Recherche</Text>
          </View>
          <Text style={styles.headerSubtitle}>Trouvez votre film préféré</Text>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un film..."
            placeholderTextColor={Colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {searchQuery === "" ? (
            <View style={styles.emptyState}>
              <SearchIcon color={Colors.textMuted} size={64} />
              <Text style={styles.emptyTitle}>Commencez à chercher</Text>
              <Text style={styles.emptySubtitle}>
                Entrez le titre du film pour rechercher
              </Text>
            </View>
          ) : filteredMovies.length > 0 ? (
            <>
              <Text style={styles.resultsText}>
                {filteredMovies.length} résultat{filteredMovies.length > 1 ? "s" : ""}
              </Text>
              <View style={styles.moviesGrid}>
                {filteredMovies.map((movie: any) => (
                  <Pressable
                    key={movie.id}
                    style={styles.movieCard}
                    onPress={() => router.push(`/movie/${movie.id}` as any)}
                  >
                    <Image
                      source={{ uri: movie.poster }}
                      style={styles.moviePoster}
                      resizeMode="cover"
                    />
                    <View style={styles.movieOverlay}>
                      <View style={styles.ratingBadge}>
                        <Text style={styles.ratingText}>⭐ {movie.rating}</Text>
                      </View>
                    </View>
                    <View style={styles.movieInfo}>
                      <Text style={styles.movieTitle} numberOfLines={1}>
                        {movie.title}
                      </Text>
                      <Text style={styles.movieGenre} numberOfLines={1}>
                        {movie.genre.join(", ")}
                      </Text>
                    </View>
                  </Pressable>
                ))}
              </View>
            </>
          ) : (
            <View style={styles.emptyState}>
              <SearchIcon color={Colors.textMuted} size={64} />
              <Text style={styles.emptyTitle}>Aucun résultat</Text>
              <Text style={styles.emptySubtitle}>
                Essayez avec un autre titre de film
              </Text>
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
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  searchInput: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  scrollContent: {
    paddingBottom: 40,
    flexGrow: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    paddingHorizontal: 40,
    paddingTop: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: Colors.text,
    marginTop: 24,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: "center" as const,
  },
  resultsText: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: Colors.textSecondary,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  moviesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
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
  movieOverlay: {
    position: "absolute" as const,
    top: 8,
    left: 8,
    right: 8,
    padding: 8,
  },
  ratingBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  ratingText: {
    color: Colors.text,
    fontSize: 13,
    fontWeight: "600" as const,
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
  },
});
