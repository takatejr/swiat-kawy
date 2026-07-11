import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./header/header";


@Component({ //dekorator @component musi byc bezposrednio nad klasa
  selector: 'app-root',
  // imports: [RouterOutlet],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [ Header, RouterOutlet]
})

export class App {
  protected readonly title = signal('moja-pierwsza-strona');
}

