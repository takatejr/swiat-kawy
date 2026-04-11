import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { produkt } from './product-grid/models';
import { ProductGridComponent } from "./product-grid/product-grid.component";


@Component({ //dekorator @component musi byc bezposrednio nad klasa
  selector: 'app-root',
  // imports: [RouterOutlet],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [CommonModule, ProductGridComponent]
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

  desery: produkt [] = [
    {
      nazwa: 'Skyr z truskawkami',
      foto: 'skyr-z-truskawkami.jpg',
      shortDesc: 'Lekka przekąska z soczystymi owocami',
      videoId: null,
      longDesc: 'Idealny wybór dla osób szukających zdrowej i lekkiej osłody w ciągu dnia. Aksamitny jogurt typu skyr w połączeniu ze świeżymi, słodkimi truskawkami tworzy kompozycję pełną białka i witamin. To orzeźwiający deser, który świetnie sprawdzi się jako drugie śniadanie do Twojej ulubionej kawy',
      czyOtwarte: false,//na poczatku wszystkie sa zamkniete
    },
    {
      nazwa: 'Gruszka w czekoladzie',
      foto: 'gruszka-w-czekoladzie.jpg',
      shortDesc: 'Eleganckie połączenie owocu i kakao',
      videoId: null,
      longDesc: 'Poczuj odrobinę luksusu dzięki naszej soczystej gruszce zatopionej w gęstej, deserowej czekoladzie. Miękkość owocu idealnie kontrastuje z intensywnym smakiem ciemnej polewy, tworząc wyrafinowaną całość. To deser dla prawdziwych smakoszy, którzy cenią sobie klasyczną elegancję na talerzu.',
      czyOtwarte: false,//na poczatku wszystkie sa zamkniete
    },
    {
      nazwa: 'Tarta czekoladowa',
      foto: 'tarta-czekoladowa.jpg',
      shortDesc: 'Intensywnie czekoladowa, krucha rozkosz',
      videoId: null,
      longDesc: 'Głęboki aromat najlepszej czekolady zamknięty na maślanym, chrupiącym spodzie. Każdy kęs tej tarty to gęsta, kremowa przyjemność, która dosłownie rozpływa się w ustach. Jeśli kochasz kakao, ta tarta stanie się Twoim nowym numerem jeden w naszym menu.',
      czyOtwarte: false,//na poczatku wszystkie sa zamkniete
    },
    {
      nazwa: 'Tiramisu',
      foto: 'tiramisu.jpg',
      shortDesc: 'Włoski klasyk o kawowym aromacie',
      videoId: null,
      longDesc: 'Przenieś się na chwilę do słonecznej Italii dzięki naszemu puszystemu tiramisu. Biszkopty nasączone mocnym espresso oraz delikatny krem na bazie serka mascarpone tworzą harmonijną, lekką strukturę. To idealne dopełnienie popołudniowej przerwy, które doda Ci energii i poprawi humor.',
      czyOtwarte: false,//na poczatku wszystkie sa zamkniete
    },
    {
      nazwa: 'Deser bananowy',
      foto: 'deser-bananowy.jpg',
      shortDesc: 'Kremowa słodycz dojrzałych bananów',
      videoId: null,
      longDesc: 'Słodki i pożywny deser, który łączy w sobie delikatność śmietanki z intensywnym smakiem dojrzałych bananów. To prawdziwa "comfort food", która przywołuje najlepsze wspomnienia i natychmiast wywołuje uśmiech na twarzy. Wybierz go, jeśli masz ochotę na coś aksamitnego i wyjątkowo sycącego',
      czyOtwarte: false,//na poczatku wszystkie sa zamkniete
    },
    {
      nazwa: 'Ciasto cytrynowe',
      foto: 'ciasto-cytrynowe.jpg',
      shortDesc: 'Orzeźwiająca cytrusowa nuta w cieście',
      videoId: null,
      longDesc: 'Lekkie i puszyste ciasto o wyraźnym, świeżym aromacie cytryn, które idealnie przełamuje słodycz. Jego wilgotna struktura i delikatny lukier sprawiają, że każda porcja smakuje jak kwintesencja lata. Doskonale komponuje się z zieloną herbatą lub klasycznym Americano.',
      czyOtwarte: false,//na poczatku wszystkie sa zamkniete
    },
    {
      nazwa: 'Chia z musem mango',
      foto: 'chia-z-musem-mango.jpg',
      shortDesc: 'Egzotyczna moc nasion chia',
      videoId: null,
      longDesc: 'Zdrowa alternatywa dla tradycyjnych słodyczy, która zachwyca swoim tropikalnym wyglądem i smakiem. Nasiona chia pęczniejące w mleku roślinnym podajemy z gęstym, aksamitnym musem z dojrzałego mango. To lekki, wegański deser, który doda Ci witamin i egzotycznej energii na cały dzień.',
      czyOtwarte: false,//na poczatku wszystkie sa zamkniete
    },
    {
      nazwa: 'Sernik nowojorski',
      foto: 'sernik-nowojorski.jpg',
      shortDesc: 'Aksamitny klasyk prosto z Manhattanu',
      videoId: null,
      longDesc: 'Poznaj smak prawdziwego, pieczonego sernika o niezwykle gęstej i gładkiej konsystencji. Wykonany z najwyższej jakości twarogu na kruchym spodzie, zachwyca swoją minimalistyczną formą i bogatym smakiem. To pozycja obowiązkowa dla każdego fana serników, który szuka ideału w każdym kęsie',
      czyOtwarte: false,//na poczatku wszystkie sa zamkniete
    }
  ];

  constructor (){
    this.produkty.forEach((przedmiot, index) => {
      if (przedmiot.videoId) { //obliczamy bezpieczny link jeden raz przy starcie aplikacji i przypisujemy go do obiektu
        przedmiot.safeUrl=this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+przedmiot.videoId);
      }
    });
  }
}

