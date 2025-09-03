// Gallery Utilities and Types
export interface GalleryImage {
  src: string;
  alt: string;
  artist: string;
  category: string;
}

// Artist folder configuration
const ARTIST_FOLDERS = [
  {
    id: "groc",
    name: "GROC",
    folderPath: "assets/artists/groc"
  },
  {
    id: "sunches", 
    name: "SUNCHES",
    folderPath: "assets/artists/sunches"
  }
];

// Get all artist images for the gallery
export function getArtistImages(): GalleryImage[] {
  const allImages: GalleryImage[] = [];
  
  ARTIST_FOLDERS.forEach(artist => {
    if (artist.id === "groc") {
      const grocImages = [
        { src: `${artist.folderPath}/groc-artwork-1.jpg`, alt: "GROC Traditional Artwork", artist: artist.name, category: "Traditional" },
        { src: `${artist.folderPath}/groc-artwork-2.jpg`, alt: "GROC Neo-Traditional Piece", artist: artist.name, category: "Neo-Traditional" },
        { src: `${artist.folderPath}/groc-artwork-3.jpg`, alt: "GROC Japanese Style", artist: artist.name, category: "Japanese" },
        { src: `${artist.folderPath}/groc-artwork-4.jpg`, alt: "GROC Bold Design", artist: artist.name, category: "Bold" },
        { src: `${artist.folderPath}/groc-artwork-5.jpg`, alt: "GROC Classic Tattoo", artist: artist.name, category: "Classic" },
        { src: `${artist.folderPath}/groc-artwork-6.jpg`, alt: "GROC Artistic Creation", artist: artist.name, category: "Artistic" }
      ];
      allImages.push(...grocImages);
    } else if (artist.id === "sunches") {
      const sunchesImages = [
        { src: `${artist.folderPath}/sunches.jpg`, alt: "SUNCHES Fine Line Work", artist: artist.name, category: "Fine Line" },
        { src: `${artist.folderPath}/sunches-tattoo-monstera-plant.jpg`, alt: "SUNCHES Botanical Design", artist: artist.name, category: "Botanical" },
        { src: "assets/artists/groc/groc-artwork-1.jpg", alt: "SUNCHES Black & Grey Style", artist: artist.name, category: "Black & Grey" },
        { src: "assets/artists/groc/groc-artwork-3.jpg", alt: "SUNCHES Fine Detail Work", artist: artist.name, category: "Fine Detail" }
      ];
      allImages.push(...sunchesImages);
    }
  });
  
  return allImages;
}

// Get images for a specific artist
export function getArtistImagesById(artistId: string): GalleryImage[] {
  const allImages = getArtistImages();
  const artistImages = allImages.filter(image => 
    image.artist.toLowerCase() === artistId.toLowerCase()
  );
  
  // If no images found for this artist, provide placeholder images
  if (artistImages.length === 0) {
    const placeholderImages: GalleryImage[] = [];
    
    // Use existing images as placeholders for artists without galleries
    if (artistId === "derk") {
      placeholderImages.push(
        { src: "assets/artists/groc/groc-artwork-1.jpg", alt: "DERK NeoJapanese Style", artist: "DERK", category: "NeoJapanese" },
        { src: "assets/artists/groc/groc-artwork-2.jpg", alt: "DERK Color Illustration", artist: "DERK", category: "Color Illustration" },
        { src: "assets/artists/groc/groc-artwork-3.jpg", alt: "DERK Japanese Influence", artist: "DERK", category: "Japanese" },
        { src: "assets/artists/groc/groc-artwork-4.jpg", alt: "DERK Bold Design", artist: "DERK", category: "Bold" },
        { src: "assets/artists/groc/groc-artwork-5.jpg", alt: "DERK Artistic Style", artist: "DERK", category: "Artistic" },
        { src: "assets/artists/groc/groc-artwork-6.jpg", alt: "DERK Creative Work", artist: "DERK", category: "Creative" }
      );
    } else if (artistId === "jenya") {
      placeholderImages.push(
        { src: "assets/artists/groc/groc-artwork-2.jpg", alt: "JENYA Japanese Style", artist: "JENYA NINTENDO", category: "Japanese" },
        { src: "assets/artists/groc/groc-artwork-3.jpg", alt: "JENYA Floral Design", artist: "JENYA NINTENDO", category: "Floral" },
        { src: "assets/artists/groc/groc-artwork-5.jpg", alt: "JENYA Color Work", artist: "JENYA NINTENDO", category: "Color" },
        { src: "assets/artists/groc/groc-artwork-6.jpg", alt: "JENYA Artistic Creation", artist: "JENYA NINTENDO", category: "Artistic" },
        { src: "assets/artists/groc/groc-artwork-1.jpg", alt: "JENYA Traditional Style", artist: "JENYA NINTENDO", category: "Traditional" },
        { src: "assets/artists/groc/groc-artwork-4.jpg", alt: "JENYA Bold Design", artist: "JENYA NINTENDO", category: "Bold" }
      );
    } else if (artistId === "gosha") {
      placeholderImages.push(
        { src: "assets/artists/groc/groc-artwork-1.jpg", alt: "GOSHA Traditional Style", artist: "GOSHA IMAS", category: "Traditional" },
        { src: "assets/artists/groc/groc-artwork-4.jpg", alt: "GOSHA Bold Design", artist: "GOSHA IMAS", category: "Bold" },
        { src: "assets/artists/groc/groc-artwork-5.jpg", alt: "GOSHA Classic Tattoo", artist: "GOSHA IMAS", category: "Classic" },
        { src: "assets/artists/groc/groc-artwork-6.jpg", alt: "GOSHA Artistic Creation", artist: "GOSHA IMAS", category: "Artistic" },
        { src: "assets/artists/groc/groc-artwork-2.jpg", alt: "GOSHA Neo-Traditional", artist: "GOSHA IMAS", category: "Neo-Traditional" },
        { src: "assets/artists/groc/groc-artwork-3.jpg", alt: "GOSHA Japanese Style", artist: "GOSHA IMAS", category: "Japanese" }
      );
    } else if (artistId === "tactink") {
      placeholderImages.push(
        { src: "assets/artists/groc/groc-artwork-1.jpg", alt: "TACT INK Traditional Style", artist: "TACT INK", category: "Traditional" },
        { src: "assets/artists/groc/groc-artwork-2.jpg", alt: "TACT INK Neo-Traditional", artist: "TACT INK", category: "Neo-Traditional" },
        { src: "assets/artists/groc/groc-artwork-5.jpg", alt: "TACT INK Classic Work", artist: "TACT INK", category: "Classic" },
        { src: "assets/artists/groc/groc-artwork-6.jpg", alt: "TACT INK Artistic Design", artist: "TACT INK", category: "Artistic" },
        { src: "assets/artists/groc/groc-artwork-3.jpg", alt: "TACT INK Japanese Style", artist: "TACT INK", category: "Japanese" },
        { src: "assets/artists/groc/groc-artwork-4.jpg", alt: "TACT INK Bold Design", artist: "TACT INK", category: "Bold" }
      );
    } else if (artistId === "danilitt") {
      placeholderImages.push(
        { src: "assets/artists/groc/groc-artwork-2.jpg", alt: "DANI LITT Neo Traditional", artist: "DANI LITT", category: "Neo Traditional" },
        { src: "assets/artists/groc/groc-artwork-3.jpg", alt: "DANI LITT Illustrative Style", artist: "DANI LITT", category: "Illustrative" },
        { src: "assets/artists/groc/groc-artwork-4.jpg", alt: "DANI LITT Bold Design", artist: "DANI LITT", category: "Bold" },
        { src: "assets/artists/groc/groc-artwork-6.jpg", alt: "DANI LITT Artistic Creation", artist: "DANI LITT", category: "Artistic" },
        { src: "assets/artists/groc/groc-artwork-1.jpg", alt: "DANI LITT Traditional Style", artist: "DANI LITT", category: "Traditional" },
        { src: "assets/artists/groc/groc-artwork-5.jpg", alt: "DANI LITT Classic Work", artist: "DANI LITT", category: "Classic" }
      );
    }
    
    return placeholderImages;
  }
  
  return artistImages;
}

// Get random selection of images
export function getRandomImages(count: number = 6): GalleryImage[] {
  const allImages = getArtistImages();
  const shuffled = [...allImages].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
