
export interface produkt {
  nazwa: string;
  foto: string;
  shortDesc: string;
  longDesc: string;
  videoId: string | null;
  czyOtwarte: boolean;
  safeUrl?: any; //dodajemy ? zeby safeUrl bylo opcjonalne
}
