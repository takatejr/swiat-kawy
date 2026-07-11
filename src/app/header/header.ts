import { Component, ElementRef, HostListener, ViewChild, inject, ɵcreateOrReusePlatformInjector } from '@angular/core';
import { Wyszukiwarka } from '../wyszukiwarka';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrls: ['./header.css', './_header-mobile.css']
})


export class Header {

  wyszukiwarka = inject(Wyszukiwarka);
  router = inject(Router);


  // wlasciwosci klasy: nazwa, typ, wartosc
  szukajAktywne: boolean = false;
  pozycjaScrolla: number = 0;
  blokadaScrolla: boolean = false;



  toggleWyszukiwarka(szukajka: HTMLInputElement) {
    this.szukajAktywne = !this.szukajAktywne;
    //Wartość, którą użytkownik wpisał do pola, znajduje się we właściwości szukajka.value. 
    this.wyszukiwarka.szukanaFraza.set(szukajka.value);

    if (this.szukajAktywne) {
      // prevent scroll powstrzymuje telefon przed przewijaniem do gory
      szukajka.focus({ preventScroll: true });
      setTimeout(() => {
        this.pozycjaScrolla = window.scrollY;
      }, 100);
    }
    else {
      //zwijamy klawiature przy zamykaniu wyszukiwarki
      szukajka.blur();
    }
  }

  // funkcja obslugujaca wpisywanie tekstu
  zawartoscInputa(szukajka: HTMLInputElement) {
    // wlaczamy blokade i przez najblizsze 300ms ignorujemy skoki scrolla
    this.blokadaScrolla = true;
    //Wartość, którą użytkownik wpisał do pola, znajduje się we właściwości szukajka.value. #szukajka to fizyczne pole html
    this.wyszukiwarka.szukanaFraza.set(szukajka.value);
    //jesli my nie na glownej to zmieniamy podstrone na glowna
    if (this.router.url !== '/') {
      this.router.navigateByUrl('/');
    }
    // gdy strona skonczy rozszerzac/kurczyc to zapisujemy stabilny punkt
    setTimeout(() => {
      this.pozycjaScrolla = window.scrollY;
      this.blokadaScrolla = false;
    }, 300);
  }


  @HostListener('document:click', ['$event'])
  klikPoza(event: MouseEvent) {
    const element = event.target as HTMLElement;
    // sprawdzamy czy klikniecie nastapilo wewnatrz ramki szukania czy w lupe
    const wSzukajce = element.closest('.wyszukiwarka-x') || element.closest('.przycisk-szukaj-mobile');

    // jesli wSzukajce znalazla element (czyli ma watrosc) to ! zmienia ja w false
    // jesli w wSzukajce jest pusta (null) to ! zmienia ja w true
    if (!wSzukajce) {
      this.szukajAktywne = false;
    }

  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Pobieramy element, który aktualnie jest "kliknięty" (ma focus)
    // const aktywnyElement = document.activeElement;
    // Zamykamy tylko jeśli wyszukiwarka jest aktywna 
    // ORAZ użytkownik nie pisze właśnie w polu (żeby autoscroll telefonu jej nie zamknął)

    // 2. sprawdzamy czy uzytkownik oddalil sie od tej pozycji o wiecej niz 50px
    const aktualnyScroll = window.scrollY;
    // const roznicaWDol = aktualnyScroll - this.pozycjaScrolla;
    const roznica = Math.abs(aktualnyScroll - this.pozycjaScrolla);

    if (this.szukajAktywne && !this.blokadaScrolla && roznica > 50) {
      this.szukajAktywne = false;
      // zabieramy focus z pola, żeby schować klawiaturę
      const pole = document.querySelector('.wyszukiwarka-pole') as HTMLElement;
      pole?.blur();
    }
  }

  // most laczacy ts z el w html: #szukajka
  @ViewChild('szukajka') szukajkaElement!: ElementRef<HTMLInputElement>;

  @HostListener('window:keydown.escape')
  klikEscape() {
    this.szukajAktywne = false;
    if (this.szukajkaElement) {
      // czyscimy tekst fizycznie w wyszukiwarce
      // this.szukajkaElement.nativeElement.value = '';
      // chowamy klawiature w telefonie i na tablecie
      this.szukajkaElement.nativeElement.blur();
    }
  }

  
}
// NA PAMIEC O WYSZUKIWARCE
// [header.html] Użytkownik wpisuje literę w pole #szukajka
//        ↓
// [header.ts] Pobiera szukajka.value i robi .set() do serwisu
//        ↓
// [wyszukiwarka.ts] Sygnał "szukanaFraza" zmienia swoją wartość
//        ↓
// [home.ts] Aktywuje się "effect" (alarm) -> uruchamia funkcję filtruj()
//        ↓
// [home.ts] Funkcja filtruj() robi .set() dla "kawyWyswietlane"
//        ↓
// [home.html] Widok automatycznie pokazuje nowe, przefiltrowane produkty!