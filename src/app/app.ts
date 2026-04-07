import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface produkt {
  nazwa: string;
  foto: string;
  shortDesc: string;
  longDesc: string;
  videoId: string | null;
  czyOtwarte: boolean;
  // expanded: boolean; //decyduje o szerokosci zdjecia i bialej ramce
  // visible: boolean; //decyduje o wysokosci rolety grid (0fr/1fr)
  safeUrl?: any; //dodajemy ? zeby safeUrl bylo opcjonalne
}

@Component({ //dekorator @component musi byc bezposrednio nad klasa
  selector: 'app-root',
  // imports: [RouterOutlet],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  private sanitizer=inject(DomSanitizer)
  getSafeUrl(videoId: string): SafeResourceUrl{
    return this.sanitizer.bypassSecurityTrustResourceUrl ('https://www.youtube.com/embed/'+videoId);
  }
  protected readonly title = signal('moja-pierwsza-strona');

  produkty: produkt [] = [
    {
      nazwa: 'Espresso',
      foto: 'espresso.jpeg',
      shortDesc: 'Intensywny smak i głęboki aromat',
      videoId: 'IbV_rF4MMwY',
      longDesc: 'Espresso to serce kazdej kawy. Powstaje poprzes przeciśnięcie gorącej wody pod wysokim ciśnieniem przez drobno zmielone ziarna. To esencja kofeiny która pobudza i zachwyca swoją cremą na wierzchu. Idealnie dla purystów i osób potrzebujących szybkiego zastrzyku energii.Espresso to serce kazdej kawy. Powstaje poprzes przeciśnięcie gorącej wody pod wysokim ciśnieniem przez drobno zmielone ziarna. To esencja kofeiny która pobudza i zachwyca swoją cremą na wierzchu. Idealnie dla purystów i osób potrzebujących szybkiego zastrzyku energii.',
      czyOtwarte: false,//na poczatku wszystkie sa zamkniete
      // expanded: false,
      // visible: false
    },
    {
      nazwa: 'Latte',
      foto: 'latte.jpg',
      shortDesc: 'Łagodna, mleczna i aksamitna',
      videoId: 'UAvsOpyyle4',
      longDesc: 'Espresso to serce kazdej kawy. Powstaje poprzes przeciśnięcie gorącej wody pod wysokim ciśnieniem przez drobno zmielone ziarna. To esencja kofeiny która pobudza i zachwyca swoją cremą na wierzchu. Idealnie dla purystów i osób potrzebujących szybkiego zastrzyku energii.',
      czyOtwarte: false,
      // expanded: false,
      // visible: false


    },
    {
      nazwa: 'Cappuccino',
      foto: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400',
      shortDesc: 'Idealny balans kawy i gęstej pianki',
      videoId: 'XunyOfwVfrw',
      longDesc: 'Espresso to serce kazdej kawy. Powstaje poprzes przeciśnięcie gorącej wody pod wysokim ciśnieniem przez drobno zmielone ziarna. To esencja kofeiny która pobudza i zachwyca swoją cremą na wierzchu. Idealnie dla purystów i osób potrzebujących szybkiego zastrzyku energii.',
      czyOtwarte: false,
      // expanded: false,
      // visible: false
    },
    {
      nazwa: 'Flat White',
      foto: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=400',
      shortDesc: 'Mocna kawa z jedwabistym mlekiem',
      videoId: null,
      longDesc: 'Espresso to serce kazdej kawy. Powstaje poprzes przeciśnięcie gorącej wody pod wysokim ciśnieniem przez drobno zmielone ziarna. To esencja kofeiny która pobudza i zachwyca swoją cremą na wierzchu. Idealnie dla purystów i osób potrzebujących szybkiego zastrzyku energii.',
      czyOtwarte: false,
      // expanded: false,
      // visible: false
    },
    {
      nazwa: 'Irish Coffee',
      foto: 'irish-coffee.jpg',
      shortDesc: 'Łagodna, mleczna i aksamitna',
      videoId: 'UAvsOpyyle4',
      longDesc: 'Espresso to serce kazdej kawy. Powstaje poprzes przeciśnięcie gorącej wody pod wysokim ciśnieniem przez drobno zmielone ziarna. To esencja kofeiny która pobudza i zachwyca swoją cremą na wierzchu. Idealnie dla purystów i osób potrzebujących szybkiego zastrzyku energii.',
      czyOtwarte: false,
      // expanded: false,
      // visible: false
    },
    {
      nazwa: 'Espresso Con Panna',
      foto: 'espresso-con-panna.jpg',
      shortDesc: 'Łagodna, mleczna i aksamitna',
      videoId: 'UAvsOpyyle4',
      longDesc: 'Espresso to serce kazdej kawy. Powstaje poprzes przeciśnięcie gorącej wody pod wysokim ciśnieniem przez drobno zmielone ziarna. To esencja kofeiny która pobudza i zachwyca swoją cremą na wierzchu. Idealnie dla purystów i osób potrzebujących szybkiego zastrzyku energii.',
      czyOtwarte: false,
      // expanded: false,
      // visible: false
    },
    {
      nazwa: 'Frappe',
      foto: 'frappe.jpg',
      shortDesc: 'Łagodna, mleczna i aksamitna',
      videoId: 'UAvsOpyyle4',
      longDesc: 'Espresso to serce kazdej kawy. Powstaje poprzes przeciśnięcie gorącej wody pod wysokim ciśnieniem przez drobno zmielone ziarna. To esencja kofeiny która pobudza i zachwyca swoją cremą na wierzchu. Idealnie dla purystów i osób potrzebujących szybkiego zastrzyku energii.',
      czyOtwarte: false,
      // expanded: false,
      // visible: false
    }

  ];

kolumny: produkt [][]=[[],[],[],[]];

  dodajDoKoszyka (kawa:string): void {
    alert('Dodano do koszyka:'+kawa);
  }

  toggleDetalis(kawa:any) {
    // kawa.expanded=!kawa.expanded; //to odwraca wartosc. (false->true, true->false)
    kawa.czyOtwarte=!kawa.czyOtwarte;
  }

  constructor (){
    this.produkty.forEach((kawa, index) => {
      if (kawa.videoId) { //obliczamy bezpieczny link jeden raz przy starcie aplikacji i przypisujemy go do obiektu
        kawa.safeUrl=this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+kawa.videoId);
      }
      this.kolumny[index % 4].push(kawa);
    });
  }
}

