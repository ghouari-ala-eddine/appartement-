export interface Apartment {
  id: number;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number; // in square meters
  imageUrl: string;
  images: string[];
  description: string;
  amenities: string[];
  latitude: number;
  longitude: number;
}

// FIX: Define a shared Filters type to ensure consistency.
export interface Filters {
  location: string;
  priceRange: [number, number];
  bedrooms: number;
  amenities: string[];
}
