import { Component, ElementRef, HostListener, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrls: ['./header.css', './_header-mobile.css']
})


export class Header {

  @Output('szukajkaAkcja') szukajkaAkcja = new EventEmitter<string>();

  szukajAktywne: boolean = false;
  pozycjaScrolla: number = 0;
  blokadaScrolla: boolean = false;


  constructor(private elementRef: ElementRef) { }
  // nasluchuje klikniec na calym dokumencie

  toggleWyszukiwarka(szukajka: HTMLInputElement) {
    this.szukajAktywne = !this.szukajAktywne;
    //Wartość, którą użytkownik wpisał do pola, znajduje się we właściwości szukajka.value. emit wysyła
    this.szukajkaAkcja.emit(szukajka.value);

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
  onInput(szukajka: HTMLInputElement) {
    // wlaczamy blokade i przez najblizsze 300ms ignorujemy skoki scrolla
    this.blokadaScrolla = true;
    //Wartość, którą użytkownik wpisał do pola, znajduje się we właściwości szukajka.value. emit wysyła
    this.szukajkaAkcja.emit(szukajka.value);
    // gdy strona skonczy rozszerzac/kurczyc to zapisujemy stabilny punkt
    setTimeout(() => {
      this.pozycjaScrolla = window.scrollY;
      this.blokadaScrolla = false;
    }, 300);
  }


  @HostListener('document:click', ['$event'])
  klikPoza(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
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
      // informujemy aplikacje o resecie
      // this.szukajkaAkcja.emit('');
      // chowamy klawiature w telefonie i na tablecie
      this.szukajkaElement.nativeElement.blur();
    }
  }


}
