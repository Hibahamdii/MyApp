import Colors from "@/constants/colors";
import { actors, movies } from "@/mocks/movies";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Star } from "lucide-react-native";
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

export default function ActorDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const actor = actors.find((a: any) => a.id === id);

  if (!actor) {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft color={Colors.text} size={24} />
          </Pressable>
        </SafeAreaView>
        <Text style={styles.errorText}>Acteur non trouvé</Text>
      </View>
    );
  }

  const actorMovies = movies.filter((m: any) => actor.movieIds.includes(m.id));

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft color={Colors.text} size={24} />
        </Pressable>
      </SafeAreaView>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.profileSection}>
            <Image source={{ uri: actor.image }} style={styles.profileImage} />
            <Text style={styles.actorName}>{actor.name}</Text>
            <Text style={styles.actorBio}>{actor.bio}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Filmographie</Text>
            <View style={styles.moviesGrid}>
              {actorMovies.map((movie: any) => (
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
                      <Star color={Colors.gold} size={12} fill={Colors.gold} />
                      <Text style={styles.ratingText}>{movie.rating}</Text>
                    </View>
                  </View>
                  <View style={styles.movieInfo}>
                    <Text style={styles.movieTitle} numberOfLines={2}>
                      {movie.title}
                    </Text>
                    <Text style={styles.movieGenre} numberOfLines={1}>
                      {movie.genre.join(", ")}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeArea: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 16,
    marginTop: 8,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingTop: 80,
  },
  profileSection: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  profileImage: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: Colors.surface,
    marginBottom: 20,
  },
  actorName: {
    fontSize: 28,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 12,
    textAlign: "center",
  },
  actorBio: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 22,
    textAlign: "center",
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 16,
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
  movieOverlay: {
    position: "absolute",
    top: 8,
    left: 8,
    right: 8,
    padding: 8,
  },
  ratingBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
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
  errorText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: "center",
    marginTop: 40,
  },
});
