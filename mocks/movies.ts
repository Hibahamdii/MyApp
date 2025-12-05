export interface Movie {
  id: string;
  title: string;
  poster: string;
  backdrop: string;
  genre: string[];
  rating: number;
  duration: number;
  releaseDate: string;
  description: string;
  director: string;
  cast: Cast[];
}

export interface Cast {
  id: string;
  name: string;
  character: string;
  image: string;
}

export interface Actor {
  id: string;
  name: string;
  image: string;
  bio: string;
  movieIds: string[];
}

export interface FoodItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'snack' | 'drink';
}

export interface Cinema {
  id: string;
  name: string;
  address: string;
  distance: string;
}

export interface Showtime {
  id: string;
  cinemaId: string;
  movieId: string;
  time: string;
  date: string;
  room: string;
  price: number;
  availableSeats: number;
}

export const movies: Movie[] = [
  {
    id: "1",
    title: "Dune: Part Two",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=400&fit=crop",
    genre: ["Science Fiction", "Adventure"],
    rating: 8.8,
    duration: 166,
    releaseDate: "2024-03-01",
    description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    director: "Denis Villeneuve",
    cast: [
      {
        id: "1",
        name: "Timothée Chalamet",
        character: "Paul Atreides",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
      },
      {
        id: "2",
        name: "Zendaya",
        character: "Chani",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
      },
      {
        id: "3",
        name: "Rebecca Ferguson",
        character: "Lady Jessica",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop"
      }
    ]
  },
  {
    id: "2",
    title: "Oppenheimer",
    poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=400&fit=crop",
    genre: ["Biography", "Drama", "History"],
    rating: 8.6,
    duration: 180,
    releaseDate: "2023-07-21",
    description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    director: "Christopher Nolan",
    cast: [
      {
        id: "4",
        name: "Cillian Murphy",
        character: "J. Robert Oppenheimer",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop"
      },
      {
        id: "5",
        name: "Emily Blunt",
        character: "Kitty Oppenheimer",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop"
      },
      {
        id: "6",
        name: "Robert Downey Jr.",
        character: "Lewis Strauss",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop"
      }
    ]
  },
  {
    id: "3",
    title: "The Batman",
    poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=800&h=400&fit=crop",
    genre: ["Action", "Crime", "Drama"],
    rating: 7.9,
    duration: 176,
    releaseDate: "2022-03-04",
    description: "When the Riddler, a sadistic serial killer, begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption.",
    director: "Matt Reeves",
    cast: [
      {
        id: "7",
        name: "Robert Pattinson",
        character: "Bruce Wayne / Batman",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop"
      },
      {
        id: "8",
        name: "Zoë Kravitz",
        character: "Selina Kyle",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop"
      },
      {
        id: "9",
        name: "Paul Dano",
        character: "The Riddler",
        image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=200&h=200&fit=crop"
      }
    ]
  },
  {
    id: "4",
    title: "Barbie",
    poster: "https://images.unsplash.com/photo-1604510607927-a9f0e1be4c67?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1604510607927-a9f0e1be4c67?w=800&h=400&fit=crop",
    genre: ["Comedy", "Adventure", "Fantasy"],
    rating: 7.2,
    duration: 114,
    releaseDate: "2023-07-21",
    description: "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land.",
    director: "Greta Gerwig",
    cast: [
      {
        id: "10",
        name: "Margot Robbie",
        character: "Barbie",
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop"
      },
      {
        id: "11",
        name: "Ryan Gosling",
        character: "Ken",
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop"
      }
    ]
  },
  {
    id: "5",
    title: "Interstellar",
    poster: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop",
    genre: ["Science Fiction", "Drama"],
    rating: 8.7,
    duration: 169,
    releaseDate: "2014-11-07",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    director: "Christopher Nolan",
    cast: [
      {
        id: "12",
        name: "Matthew McConaughey",
        character: "Cooper",
        image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&h=200&fit=crop"
      },
      {
        id: "13",
        name: "Anne Hathaway",
        character: "Brand",
        image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200&h=200&fit=crop"
      }
    ]
  },
  {
    id: "6",
    title: "Inception",
    poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=400&fit=crop",
    genre: ["Action", "Science Fiction", "Thriller"],
    rating: 8.8,
    duration: 148,
    releaseDate: "2010-07-16",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.",
    director: "Christopher Nolan",
    cast: [
      {
        id: "14",
        name: "Leonardo DiCaprio",
        character: "Cobb",
        image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&h=200&fit=crop"
      },
      {
        id: "15",
        name: "Joseph Gordon-Levitt",
        character: "Arthur",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop"
      }
    ]
  }
];

export const cinemas: Cinema[] = [
  {
    id: "1",
    name: "Cinéma Gaumont Opéra",
    address: "2 Boulevard des Capucines, 75009 Paris",
    distance: "1.2 km"
  },
  {
    id: "2",
    name: "UGC Ciné Cité Les Halles",
    address: "7 Place de la Rotonde, 75001 Paris",
    distance: "2.5 km"
  },
  {
    id: "3",
    name: "Pathé Beaugrenelle",
    address: "7 Rue Linois, 75015 Paris",
    distance: "3.8 km"
  },
  {
    id: "4",
    name: "MK2 Bibliothèque",
    address: "128-162 Avenue de France, 75013 Paris",
    distance: "4.2 km"
  }
];

export const actors: Actor[] = [
  {
    id: "1",
    name: "Timothée Chalamet",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    bio: "Acteur américain connu pour ses rôles dans Call Me by Your Name et Dune.",
    movieIds: ["1"]
  },
  {
    id: "2",
    name: "Zendaya",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    bio: "Actrice et chanteuse américaine, connue pour Euphoria et Spider-Man.",
    movieIds: ["1"]
  },
  {
    id: "4",
    name: "Cillian Murphy",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    bio: "Acteur irlandais célèbre pour Peaky Blinders et Oppenheimer.",
    movieIds: ["2"]
  },
  {
    id: "7",
    name: "Robert Pattinson",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop",
    bio: "Acteur britannique connu pour Twilight et The Batman.",
    movieIds: ["3"]
  },
  {
    id: "10",
    name: "Margot Robbie",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop",
    bio: "Actrice et productrice australienne, célèbre pour Barbie et Suicide Squad.",
    movieIds: ["4"]
  },
  {
    id: "14",
    name: "Leonardo DiCaprio",
    image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&h=200&fit=crop",
    bio: "Acteur américain légendaire, oscarisé pour The Revenant.",
    movieIds: ["6"]
  }
];

export const foodItems: FoodItem[] = [
  {
    id: "popcorn-medium",
    name: "Popcorn Moyen",
    price: 5.50,
    image: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=200&h=200&fit=crop",
    category: "snack"
  },
  {
    id: "popcorn-large",
    name: "Popcorn Grand",
    price: 7.50,
    image: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=200&h=200&fit=crop",
    category: "snack"
  },
  {
    id: "nachos",
    name: "Nachos",
    price: 6.00,
    image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=200&h=200&fit=crop",
    category: "snack"
  },
  {
    id: "sprite",
    name: "Sprite",
    price: 4.50,
    image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=200&h=200&fit=crop",
    category: "drink"
  },
  {
    id: "orange-juice",
    name: "Jus d'Orange",
    price: 4.00,
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=200&h=200&fit=crop",
    category: "drink"
  },
  {
    id: "water",
    name: "Eau Minérale",
    price: 3.00,
    image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=200&h=200&fit=crop",
    category: "drink"
  }
];

export const categories = [
  { id: "action", name: "Action", movieIds: ["3", "6"] },
  { id: "sci-fi", name: "Science Fiction", movieIds: ["1", "5"] },
  { id: "comedy", name: "Comédie", movieIds: ["4"] },
  { id: "drama", name: "Drame", movieIds: ["2"] }
];

export const generateShowtimes = (movieId: string): Showtime[] => {
  const times = ["10:30", "13:45", "16:20", "19:00", "21:45"];
  const rooms = ["Salle 1", "Salle 2", "Salle 3", "Salle Premium"];
  const dates = ["2024-03-15", "2024-03-16", "2024-03-17"];
  const showtimes: Showtime[] = [];
  
  dates.forEach((date) => {
    cinemas.forEach((cinema) => {
      times.forEach((time, index) => {
        showtimes.push({
          id: `${movieId}-${cinema.id}-${date}-${time}`,
          cinemaId: cinema.id,
          movieId,
          time,
          date,
          room: rooms[index % rooms.length],
          price: cinema.id === "3" || cinema.id === "4" ? 14.5 : 12.0,
          availableSeats: Math.floor(Math.random() * 50) + 30
        });
      });
    });
  });
  
  return showtimes;
};
