import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export interface Booking {
  id: string;
  movieId: string;
  movieTitle: string;
  cinemaName: string;
  time: string;
  date: string;
  room: string;
  seats: number;
  total: number;
  foodItems: Record<string, number>;
  createdAt: string;
  status: 'confirmed' | 'cancelled';
}

interface UserData {
  favorites: string[];
  bookings: Booking[];
}

export const [UserContext, useUser] = createContextHook(() => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const stored = await AsyncStorage.getItem('user-data');
      if (stored) {
        const data: UserData = JSON.parse(stored);
        setFavorites(data.favorites || []);
        setBookings(data.bookings || []);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveUserData = async (data: UserData) => {
    try {
      await AsyncStorage.setItem('user-data', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const toggleFavorite = (movieId: string) => {
    const newFavorites = favorites.includes(movieId)
      ? favorites.filter((id) => id !== movieId)
      : [...favorites, movieId];
    
    setFavorites(newFavorites);
    saveUserData({ favorites: newFavorites, bookings });
  };

  const isFavorite = (movieId: string): boolean => {
    return favorites.includes(movieId);
  };

  const addBooking = (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>) => {
    const newBooking: Booking = {
      ...booking,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    };
    
    const newBookings = [...bookings, newBooking];
    setBookings(newBookings);
    saveUserData({ favorites, bookings: newBookings });
  };

  const cancelBooking = (bookingId: string) => {
    const newBookings = bookings.map((booking) =>
      booking.id === bookingId
        ? { ...booking, status: 'cancelled' as const }
        : booking
    );
    
    setBookings(newBookings);
    saveUserData({ favorites, bookings: newBookings });
  };

  const getConfirmedBookings = (): Booking[] => {
    return bookings.filter((b) => b.status === 'confirmed');
  };

  const getAllBookings = (): Booking[] => {
    return bookings;
  };

  return {
    favorites,
    bookings,
    isLoading,
    toggleFavorite,
    isFavorite,
    addBooking,
    cancelBooking,
    getConfirmedBookings,
    getAllBookings,
  };
});
