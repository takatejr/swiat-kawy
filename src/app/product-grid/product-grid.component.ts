import { Component, Input } from "@angular/core";
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

export class ProductGridComponent {
    @Input ({ required: true }) tytul!: string;
    @Input ({ required: true }) kolumny: produkt [][] = [];

    constructor (private sanitizer: DomSanitizer) {};

    dodajDoKoszyka (kawa:string): void { alert('Dodano do koszyka:'+kawa) };
    toggleDetails(kawa:produkt) { kawa.czyOtwarte=!kawa.czyOtwarte };
}



