import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-o-nas',
  standalone: true,
  templateUrl: './o-nas.html',
  styleUrl: './o-nas.css',
})
export class ONas {
  protected tekst = signal('<em>Witaj w naszej kawiarni!</em> Jesteśmy miejscem, gdzie pasja spotyka się z aromatem. Została stworzona z myślą o lokalnej społeczności, jako oaza spokoju w tętniącym życiem mieście. Ziarna, z których korzystamy, sprowadzamy bezpośrednio z małych, etycznych plantacji w Ameryce Południowej i Afryce.\nNasi bariści to prawdziwi pasjonaci, którzy każdego dnia dbają o to, by każda filiżanka była idealnie zbalansowana. Wpadnij do nas, rozgość się i pozwól, że zabierzemy Cię w aromatyczną podróż.');

  protected zdjecia = [
    'kawiarnia1.png',
    'kawiarnia2.png',
    'kawiarnia3.png',
    'kawiarnia4.png',
    'kawiarnia5.png'
  ];

  // licznik zdjec
  protected aktualnyIndeks = signal(0);

  // sygnał może przechowywać <liczbę ALBO brak wartości>. stan lightboxa domyslny (null = zamkniety)
  protected lightboxIndeks = signal<number | null>(null);


  // np (3 + 1)% 5 >> 4%5 >> 4
  protected nastepneZdjecie() {
    this.aktualnyIndeks.update(i => (i + 1) % this.zdjecia.length)
  }
  // np (3 - 1 + 5liczba zdjec)% 5 >> 7%5 >> 2
  protected poprzednieZdjecie() {
    this.aktualnyIndeks.update(i => (i - 1 + this.zdjecia.length) % this.zdjecia.length)
  }


  protected otworzLightbox(indeks: number) {
    this.lightboxIndeks.set(indeks)
  }

  protected zamknijLightbox() {
    this.lightboxIndeks.set(null)
  }

  protected lightboxNastepne(event: Event) {
    // blokujemy zamyknie okna
    event.stopPropagation();

    this.lightboxIndeks.update(indeks => {
      if (indeks !== null) {
        return ((indeks + 1) % this.zdjecia.length)
      }
      // zabezpieczenie na wypadek braku zdjec - zwracamy null bez obliczenia
      return null;
    })
  }

  protected lightboxPoprzednie(event: Event) {
    // blokujemy zamyknie okna
    event.stopPropagation();

    this.lightboxIndeks.update(indeks => {
      if (indeks !== null) {
        return ((indeks - 1 + this.zdjecia.length) % this.zdjecia.length)
      }
      return null;
    })
  }

  // 3000=3sek
  constructor() {
    setInterval(() => {
      this.nastepneZdjecie();
    }, 3000);
  }

  protected wiadomoscWyslana = signal(false);

  protected wyslijWiadomosc(event: Event, email: HTMLInputElement, tresc: HTMLTextAreaElement, newsletter: HTMLInputElement) {
    // blokuje odswiezanie strony
    event.preventDefault();
    this.wiadomoscWyslana.set(true);
    email.value = '';
    tresc.value = '';
    newsletter.checked = false;
    this.newsletterZaznaczony.set(false);
  }

  protected newsletterZaznaczony = signal(false);

  protected chceNewsletter = signal(false);

  protected wyslijChec(event: Event, newsletterDrugi: HTMLInputElement) {
    event.preventDefault();
    this.chceNewsletter.set(true);
    newsletterDrugi.value = '';

  }


}

