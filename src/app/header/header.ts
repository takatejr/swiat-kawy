import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrls: ['./header.css', './_header-mobile.css']
})


export class Header {
  szukajAktywne: boolean = false;
  
  constructor(private elementRef: ElementRef) { }
  // nasluchuje klikniec na calym dokumencie
  @HostListener('document:click', ['$event'])
  klikPoza(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.szukajAktywne = false;
    }
  }

  toggleWyszukiwarka(szukajka: HTMLInputElement) {
    this.szukajAktywne = !this.szukajAktywne;
    if (this.szukajAktywne) {

      setTimeout(() => { szukajka.focus();}, 50);
    }
    else {
      //zwijamy klawiature przy zamykaniu wyszukiwarki
      szukajka.blur();
    }
  }
}
