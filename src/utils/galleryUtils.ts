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
        { src: `${artist.folderPath}/sunches-tattoo-monstera-plant.jpg`, alt: "SUNCHES Botanical Design", artist: artist.name, category: "Botanical" }
      ];
      allImages.push(...sunchesImages);
    }
  });
  
  return allImages;
}

// Get images for a specific artist
export function getArtistImagesById(artistId: string): GalleryImage[] {
  return getArtistImages().filter(image => 
    image.artist.toLowerCase() === artistId.toLowerCase()
  );
}

// Get random selection of images
export function getRandomImages(count: number = 6): GalleryImage[] {
  const allImages = getArtistImages();
  const shuffled = [...allImages].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
