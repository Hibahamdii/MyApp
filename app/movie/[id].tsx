import Colors from "@/constants/colors";
import { useUser } from "@/contexts/UserContext";
import { cinemas, generateShowtimes, movies } from "@/mocks/movies";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Calendar, Clock, Heart, MapPin, Star, ThumbsDown, ThumbsUp, Users } from "lucide-react-native";
import React, { useState } from "react";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MovieDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const movie = movies.find((m: any) => m.id === id);
  const [userRating, setUserRating] = useState<number>(0);
  const [liked, setLiked] = useState<boolean | null>(null);
  const { isFavorite, toggleFavorite } = useUser();
  const isMovieFavorite = movie ? isFavorite(movie.id) : false;

  if (!movie) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Film non trouvé</Text>
      </View>
    );
  }

  const showtimes = generateShowtimes(movie.id);
  const availableCinemas = cinemas.filter((cinema: any) =>
    showtimes.some((st: any) => st.cinemaId === cinema.id)
  );

  return (
    <View style={styles.container}>
      <Image source={{ uri: movie.backdrop }} style={styles.backdrop} />
      
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <View style={styles.topButtons}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft color={Colors.text} size={24} />
          </Pressable>
          <Pressable 
            style={styles.favoriteButton} 
            onPress={() => movie && toggleFavorite(movie.id)}
          >
            <Heart 
              color={isMovieFavorite ? Colors.primary : Colors.text} 
              size={24}
              fill={isMovieFavorite ? Colors.primary : "transparent"}
            />
          </Pressable>
        </View>
      </SafeAreaView>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.posterSection}>
            <Image source={{ uri: movie.poster }} style={styles.poster} />
            <View style={styles.titleSection}>
              <Text style={styles.title}>{movie.title}</Text>
              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <Star color={Colors.gold} size={16} fill={Colors.gold} />
                  <Text style={styles.metaText}>{movie.rating}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Clock color={Colors.textSecondary} size={16} />
                  <Text style={styles.metaText}>{movie.duration} min</Text>
                </View>
              </View>
              <View style={styles.genreContainer}>
                {movie.genre.map((g: any, idx: number) => (
                  <View key={idx} style={styles.genreBadge}>
                    <Text style={styles.genreText}>{g}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Synopsis</Text>
            <Text style={styles.description}>{movie.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Réalisateur</Text>
            <Text style={styles.directorText}>{movie.director}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notez ce film</Text>
            <View style={styles.ratingSection}>
              <View style={styles.ratingStars}>
                {[1, 2, 3, 4, 5].map((star: number) => (
                  <Pressable 
                    key={star} 
                    style={styles.starButton}
                    onPress={() => setUserRating(star)}
                  >
                    <Star
                      color={star <= userRating ? Colors.gold : Colors.border}
                      size={32}
                      fill={star <= userRating ? Colors.gold : "transparent"}
                    />
                  </Pressable>
                ))}
              </View>
              <Text style={styles.ratingScore}>{movie.rating}/10</Text>
              {userRating > 0 && (
                <Text style={styles.yourRatingText}>Votre note: {userRating}/5 ⭐</Text>
              )}
              <View style={styles.ratingActions}>
                <Pressable 
                  style={[
                    styles.ratingButton,
                    liked === true && styles.ratingButtonActive
                  ]}
                  onPress={() => setLiked(liked === true ? null : true)}
                >
                  <ThumbsUp 
                    color={liked === true ? Colors.text : Colors.primary} 
                    size={20} 
                    fill={liked === true ? Colors.primary : "transparent"}
                  />
                  <Text style={[
                    styles.ratingButtonText,
                    liked === true && styles.ratingButtonTextActive
                  ]}>J&apos;aime</Text>
                </Pressable>
                <Pressable 
                  style={[
                    styles.ratingButton,
                    liked === false && styles.ratingButtonDislike
                  ]}
                  onPress={() => setLiked(liked === false ? null : false)}
                >
                  <ThumbsDown 
                    color={liked === false ? Colors.text : Colors.textMuted} 
                    size={20}
                    fill={liked === false ? "#FF3B30" : "transparent"}
                  />
                  <Text style={[
                    styles.ratingButtonText,
                    liked === false && styles.ratingButtonTextDislike
                  ]}>Je n&apos;aime pas</Text>
                </Pressable>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Distribution</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.castList}
            >
              {movie.cast.map((actor: any) => (
                <View key={actor.id} style={styles.castCard}>
                  <Image
                    source={{ uri: actor.image }}
                    style={styles.castImage}
                  />
                  <Text style={styles.castName} numberOfLines={1}>
                    {actor.name}
                  </Text>
                  <Text style={styles.castCharacter} numberOfLines={1}>
                    {actor.character}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cinémas disponibles</Text>
            {availableCinemas.map((cinema: any) => {
              const cinemaShowtimes = showtimes.filter(
                (st: any) => st.cinemaId === cinema.id
              );
              const uniqueDates = Array.from(
                new Set(cinemaShowtimes.map((st: any) => st.date))
              );

              return (
                <View key={cinema.id} style={styles.cinemaCard}>
                  <View style={styles.cinemaHeader}>
                    <View style={styles.cinemaInfo}>
                      <Text style={styles.cinemaName}>{cinema.name}</Text>
                      <View style={styles.cinemaLocation}>
                        <MapPin color={Colors.textSecondary} size={14} />
                        <Text style={styles.cinemaAddress}>
                          {cinema.distance}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {uniqueDates.slice(0, 1).map((date: any) => {
                    const dateShowtimes = cinemaShowtimes.filter(
                      (st: any) => st.date === date
                    );

                    return (
                      <View key={date} style={styles.dateSection}>
                        <View style={styles.dateHeader}>
                          <Calendar color={Colors.textSecondary} size={16} />
                          <Text style={styles.dateText}>
                            {new Date(date).toLocaleDateString("fr-FR", {
                              weekday: "short",
                              day: "numeric",
                              month: "short",
                            })}
                          </Text>
                        </View>
                        <View style={styles.showtimesGrid}>
                          {dateShowtimes.slice(0, 4).map((showtime: any) => (
                            <Pressable
                              key={showtime.id}
                              style={styles.showtimeButton}
                              onPress={() => {
                                const params = {
                                  id: showtime.id,
                                  movieTitle: movie.title,
                                  cinemaName: cinema.name,
                                  time: showtime.time,
                                  date: showtime.date,
                                  room: showtime.room,
                                  price: showtime.price.toString(),
                                };
                                router.push({
                                  pathname: "/booking/[id]",
                                  params,
                                } as any);
                              }}
                            >
                              <Text style={styles.showtimeTime}>
                                {showtime.time}
                              </Text>
                              <View style={styles.showtimeInfo}>
                                <Users
                                  color={Colors.textMuted}
                                  size={12}
                                />
                                <Text style={styles.showtimeSeats}>
                                  {showtime.availableSeats}
                                </Text>
                              </View>
                            </Pressable>
                          ))}
                        </View>
                      </View>
                    );
                  })}
                </View>
              );
            })}
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
  backdrop: {
    width: "100%",
    height: 300,
    position: "absolute",
    top: 0,
  },
  safeArea: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  topButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    marginTop: 240,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
  },
  posterSection: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 12,
    backgroundColor: Colors.surface,
  },
  titleSection: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: "600" as const,
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  genreBadge: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  genreText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: "500" as const,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  directorText: {
    fontSize: 15,
    color: Colors.text,
    fontWeight: "600" as const,
  },
  castList: {
    gap: 16,
  },
  castCard: {
    width: 100,
  },
  castImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.surface,
    marginBottom: 8,
  },
  castName: {
    fontSize: 13,
    fontWeight: "600" as const,
    color: Colors.text,
    textAlign: "center",
    marginBottom: 4,
  },
  castCharacter: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  cinemaCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cinemaHeader: {
    marginBottom: 16,
  },
  cinemaInfo: {
    gap: 8,
  },
  cinemaName: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: Colors.text,
  },
  cinemaLocation: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  cinemaAddress: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  dateSection: {
    gap: 12,
  },
  dateHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dateText: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: Colors.textSecondary,
    textTransform: "capitalize",
  },
  showtimesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  showtimeButton: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    minWidth: 85,
    alignItems: "center",
  },
  showtimeTime: {
    fontSize: 15,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 4,
  },
  showtimeInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  showtimeSeats: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  errorText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: "center",
    marginTop: 40,
  },
  ratingSection: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center" as const,
  },
  ratingStars: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  starButton: {
    padding: 4,
  },
  ratingScore: {
    fontSize: 28,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 20,
  },
  ratingActions: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  ratingButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center" as const,
    justifyContent: "center" as const,
    gap: 8,
    backgroundColor: Colors.background,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  ratingButtonText: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: Colors.text,
  },
  yourRatingText: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: Colors.primary,
    marginBottom: 16,
  },
  ratingButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  ratingButtonTextActive: {
    color: Colors.text,
  },
  ratingButtonDislike: {
    backgroundColor: "#FF3B30",
    borderColor: "#FF3B30",
  },
  ratingButtonTextDislike: {
    color: Colors.text,
  },
});
