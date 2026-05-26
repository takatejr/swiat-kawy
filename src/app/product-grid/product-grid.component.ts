import { Component, Input, HostListener } from "@angular/core";
import { CommonModule } from "@angular/common";
import { produkt } from "./models";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
    selector: 'app-product-grid',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './product-grid.component.html',
    styleUrl: './product-grid.component.css'
})

export class ProductGridComponent {
    @Input({ required: true }) tytul!: string;
    @Input({ required: true })
    set elementy(filtrowaneElementy: produkt[]) {
        this._elementy = filtrowaneElementy; /* wkladamy nowa liste do pudelka */
        this.przeliczKolumny(); /*od razu prosimy o odswiezanie widoku */
    }
    /*Getter pozwala reszcie kodu „czytać” z tego pudełka tak jak wcześniej */
    get elementy(): produkt[] {
        return this._elementy;
    }

    private _elementy: produkt[] = []; /*prywatne pudelko na dane*/


    kolumny: produkt[][] = [];



    @HostListener('window:resize')
    onResize() {
        this.przeliczKolumny();
    }

    przeliczKolumny() { /* glowna funkcja dzielaca kawy */
        const szerokoscOkna = window.innerWidth;
        const konfiguracjaProgowa = [
            { prog: 1500, kolumny: 5 },
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
        for (let i = 0; i < iloscKolumn; i++) { this.kolumny.push([]); }

        this.elementy.forEach((przedmiot, index) => { /* rozrzucenie kaw po kolumnach jedna po drugiej */
            this.kolumny[index % iloscKolumn].push(przedmiot);
        });
    }

    constructor(private sanitizer: DomSanitizer) { };

    dodajDoKoszyka(przedmiot: string): void { alert('Dodano do koszyka:' + przedmiot) };
    toggleDetails(przedmiot: produkt) { przedmiot.czyOtwarte = !przedmiot.czyOtwarte };
}



