// This file helps TypeScript understand the available routes in Expo Router
export type RootStackParamList = {
  // Root level routes
  index: undefined;
  payment: {
    movieId: string;
    movieTitle: string;
    cinemaName: string;
    time: string;
    date: string;
    room: string;
    seats: number;
    total: number;
    foodItems: Record<string, number>;
  };
  success: {
    movieTitle: string;
    cinemaName: string;
    time: string;
    date: string;
    room: string;
    seats: string;
    total: string;
    foodItems: Record<string, number>;
  };
  "+not-found": undefined;
  
  // Tabs routes
  "(tabs)": undefined;
  "(tabs)/index": undefined;
  "(tabs)/search": undefined;
  "(tabs)/cinemas": undefined;
  "(tabs)/profile": undefined;
  
  // Auth routes
  "(auth)/signin": undefined;
  "(auth)/signup": undefined;
  
  // Dynamic routes
  "movie/[id]": {
    id: string;
  };
  "actor/[id]": {
    id: string;
  };
  "booking/[id]": {
    id: string;
    movieTitle: string;
    cinemaName: string;
    time: string;
    date: string;
    room: string;
    price: string;
  };
  
  // Profile subroutes
  "profile/booking": undefined;
  "profile/favorites": undefined;
};
