import { Component, Input, HostListener, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { produkt } from "./models";
import { DomSanitizer } from "@angular/platform-browser";

@Component ({
    selector: 'app-product-grid',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './product-grid.component.html',
    styleUrl: './product-grid.component.css'
})

export class ProductGridComponent implements OnInit{
    @Input ({ required: true }) tytul!: string;
    @Input ({ required: true }) elementy: produkt [] = []; /* produkty; to nazwa pudelka, produkt to kazdy el opisany w modelu produkt - nazwa,foto.. */
    kolumny: produkt [][] = [];

    ngOnInit() { /*uruchamia sie przy starcie by strona nie byla pusta */
        this.przeliczKolumny ();
    }

    @HostListener ('window:resize')
    onResize() {
        this.przeliczKolumny ();
    }

    przeliczKolumny() { /* glowna funkcja dzielaca kawy */
        const szerokoscOkna = window.innerWidth;
        const konfiguracjaProgowa = [
            { prog: 1400, kolumny: 5 },
            { prog: 1200, kolumny: 4 },
            { prog: 900, kolumny: 3 },
            { prog: 600, kolumny: 2 },]
        let iloscKolumn = 1; /* domyslnie 1  */
        for (const pojedynczyProg of konfiguracjaProgowa) {
            if (szerokoscOkna > pojedynczyProg.prog) {
                iloscKolumn = pojedynczyProg.kolumny;
                break;
            }
        }
        this.kolumny = []; /*tworzymy puste kolumny w tablicy */
        for (let i = 0; i < iloscKolumn; i++) {this.kolumny.push ([]);}

        this.elementy.forEach ((przedmiot, index) => { /* rozrzucenie kaw po kolumnach jedna po drugiej */
            this.kolumny [index % iloscKolumn].push(przedmiot);
        });
    }

    constructor (private sanitizer: DomSanitizer) {};

    dodajDoKoszyka (przedmiot:string): void { alert('Dodano do koszyka:'+przedmiot) };
    toggleDetails(przedmiot:produkt) { przedmiot.czyOtwarte=!przedmiot.czyOtwarte };
}



