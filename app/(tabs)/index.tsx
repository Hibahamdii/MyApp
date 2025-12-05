import Colors from "@/constants/colors";
import { actors, categories, movies } from "@/mocks/movies";
import { useRouter } from "expo-router";
import { Film, Search, TrendingUp } from "lucide-react-native";
import React, { useMemo, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const scrollY = useRef(new Animated.Value(0)).current;

  const featuredMovies = movies.slice(0, 3);
  const featuredScales = useMemo(() => 
    featuredMovies.map((_: any) => new Animated.Value(1)),
    [featuredMovies]
  );

  let filteredMovies = selectedCategory === "all" 
    ? movies 
    : movies.filter((movie: any) => {
        const category = categories.find((c: any) => c.id === selectedCategory);
        return category?.movieIds.includes(movie.id);
      });

  if (searchQuery) {
    filteredMovies = filteredMovies.filter((movie: any) => 
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const posterScales = useMemo(() => 
    filteredMovies.map((_: any) => new Animated.Value(1)),
    [filteredMovies.length]
  );

  const actorScales = useMemo(() => 
    actors.map((_: any) => new Animated.Value(1)),
    []
  );

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.8],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
          <View style={styles.headerTop}>
            <Film color={Colors.primary} size={32} />
            <Text style={styles.headerTitle}>CinéBook</Text>
          </View>
          <Text style={styles.headerSubtitle}>Réservez vos films en un clic</Text>
          
          <View style={styles.searchContainer}>
            <Search color={Colors.textSecondary} size={20} />
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher un film..."
              placeholderTextColor={Colors.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </Animated.View>

        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        >
          <View style={styles.categoryTabsContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryTabs}
            >
              <Pressable
                style={[
                  styles.categoryTab,
                  selectedCategory === "all" && styles.categoryTabActive,
                ]}
                onPress={() => setSelectedCategory("all")}
              >
                <Text
                  style={[
                    styles.categoryTabText,
                    selectedCategory === "all" && styles.categoryTabTextActive,
                  ]}
                >
                  Tous
                </Text>
              </Pressable>
              {categories.map((category: any) => (
                <Pressable
                  key={category.id}
                  style={[
                    styles.categoryTab,
                    selectedCategory === category.id && styles.categoryTabActive,
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <Text
                    style={[
                      styles.categoryTabText,
                      selectedCategory === category.id && styles.categoryTabTextActive,
                    ]}
                  >
                    {category.name}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          <View style={styles.featuredSection}>
            <View style={styles.sectionHeader}>
              <TrendingUp color={Colors.primary} size={20} />
              <Text style={styles.sectionTitle}>Tendances</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredScroll}
              pagingEnabled
            >
              {featuredMovies.map((movie: any, index: number) => {
                const imageScale = featuredScales[index];

                const handlePressIn = () => {
                  Animated.spring(imageScale, {
                    toValue: 0.95,
                    useNativeDriver: true,
                  }).start();
                };

                const handlePressOut = () => {
                  Animated.spring(imageScale, {
                    toValue: 1,
                    friction: 3,
                    tension: 40,
                    useNativeDriver: true,
                  }).start();
                };

                return (
                <Pressable
                  key={movie.id}
                  style={styles.featuredCard}
                  onPress={() => router.push(`/movie/${movie.id}` as any)}
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                >
                  <Animated.Image
                    source={{ uri: movie.backdrop }}
                    style={[styles.featuredImage, { transform: [{ scale: imageScale }] }]}
                    resizeMode="cover"
                  />
                  <View style={styles.featuredOverlay}>
                    <View style={styles.featuredContent}>
                      <Text style={styles.featuredTitle}>{movie.title}</Text>
                      <Text style={styles.featuredGenre}>
                        {movie.genre.join(" • ")}
                      </Text>
                      <View style={styles.featuredRating}>
                        <Text style={styles.featuredRatingText}>
                          ⭐ {movie.rating}
                        </Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
                );
              })}
            </ScrollView>
          </View>

          <View style={styles.moviesSection}>
            <Text style={styles.sectionTitle}>Films populaires</Text>
            <View style={styles.moviesGrid}>
              {filteredMovies.map((movie: any, index: number) => {
                const posterScale = posterScales[index];

                const handlePosterPressIn = () => {
                  Animated.spring(posterScale, {
                    toValue: 0.95,
                    useNativeDriver: true,
                  }).start();
                };

                const handlePosterPressOut = () => {
                  Animated.spring(posterScale, {
                    toValue: 1,
                    friction: 3,
                    tension: 40,
                    useNativeDriver: true,
                  }).start();
                };

                return (
                <Pressable
                  key={movie.id}
                  style={styles.movieCard}
                  onPress={() => router.push(`/movie/${movie.id}` as any)}
                  onPressIn={handlePosterPressIn}
                  onPressOut={handlePosterPressOut}
                >
                  <Animated.Image
                    source={{ uri: movie.poster }}
                    style={[styles.moviePoster, { transform: [{ scale: posterScale }] }]}
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
                );
              })}
            </View>
          </View>

          <View style={styles.actorsSection}>
            <Text style={styles.sectionTitle}>Acteurs populaires</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScroll}
            >
              {actors.map((actor: any, index: number) => {
                const actorScale = actorScales[index];

                const handleActorPressIn = () => {
                  Animated.spring(actorScale, {
                    toValue: 0.9,
                    useNativeDriver: true,
                  }).start();
                };

                const handleActorPressOut = () => {
                  Animated.spring(actorScale, {
                    toValue: 1,
                    friction: 3,
                    tension: 40,
                    useNativeDriver: true,
                  }).start();
                };

                return (
                <Pressable
                  key={actor.id}
                  style={styles.actorCard}
                  onPress={() =>
                    router.push(`/actor/${actor.id}` as any)
                  }
                  onPressIn={handleActorPressIn}
                  onPressOut={handleActorPressOut}
                >
                  <Animated.Image
                    source={{ uri: actor.image }}
                    style={[styles.actorImage, { transform: [{ scale: actorScale }] }]}
                    resizeMode="cover"
                  />
                  <Text style={styles.actorName} numberOfLines={2}>
                    {actor.name}
                  </Text>
                </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </Animated.ScrollView>
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
    paddingBottom: 16,
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
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  categoryTabsContainer: {
    marginBottom: 24,
  },
  categoryTabs: {
    paddingHorizontal: 20,
    gap: 8,
  },
  categoryTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryTabActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryTabText: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: Colors.textSecondary,
  },
  categoryTabTextActive: {
    color: Colors.text,
  },
  featuredSection: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center" as const,
    gap: 8,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700" as const,
    color: Colors.text,
  },
  featuredScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  featuredCard: {
    width: width - 40,
    height: 200,
    borderRadius: 16,
    overflow: "hidden" as const,
  },
  featuredImage: {
    width: "100%",
    height: "100%",
  },
  featuredOverlay: {
    position: "absolute" as const,
    bottom: 0,
    left: 0,
    right: 0,
    height: "100%",
    justifyContent: "flex-end" as const,
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  featuredContent: {
    gap: 8,
  },
  featuredTitle: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: Colors.text,
  },
  featuredGenre: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  featuredRating: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  featuredRatingText: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: "600" as const,
  },
  moviesSection: {
    marginBottom: 32,
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
  actorsSection: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  horizontalScroll: {
    gap: 12,
  },
  actorCard: {
    width: 100,
    alignItems: "center" as const,
  },
  actorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.surface,
    marginBottom: 8,
  },
  actorName: {
    fontSize: 13,
    fontWeight: "600" as const,
    color: Colors.text,
    textAlign: "center" as const,
  }
});
