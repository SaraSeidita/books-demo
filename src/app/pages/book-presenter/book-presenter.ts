import { Component, effect, inject, input, numberAttribute } from '@angular/core';
import { BookPresenterStore } from './store/book-presenter.store';
import { Router } from '@angular/router';
import { BOOKS_COLLECTION } from '../../data/books-collection';

@Component({
  selector: 'app-book-presenter',
  imports: [],
  templateUrl: './book-presenter.html',
  styleUrl: './book-presenter.css',
  providers: [BookPresenterStore]
})
export class BookPresenter {
  readonly id = input.required({transform: numberAttribute}); // input per ricevere l'id del libro da visualizzare, trasformato in numero
  // transform: numberAttribute è una funzione che converte l'input in un numero, utile per assicurarsi che l'id sia sempre un numero, anche se viene passato come stringa
  
  store = inject(BookPresenterStore); // inietta lo store del presenter per accedere allo stato e ai metodi dello store
  
  readonly router = inject(Router); // inietta il router per navigare tra le pagine

  next() {
    this.router.navigate(['books', Math.min(this.id() + 1, BOOKS_COLLECTION.length-1)]); // naviga alla pagina del libro successivo, limitando l'id al numero massimo di libri disponibili
  }

  prev() {
    this.router.navigate(['books', Math.max(this.id() - 1, 0)]); // naviga alla pagina del libro precedente, limitando l'id al valore minimo di 0
  }

  constructor() {
    // non mi serve più usare effect()
    this.store.setBookId(this.id); // imposta l'id del libro selezionato nello store in base all'input ricevuto
    // come funziona? quando il componente viene creato, viene eseguito il costruttore, che chiama il metodo setBookId dello store passando l'id ricevuto come input.
    // questo metodo aggiorna lo stato dello store con il nuovo id del libro selezionato, e grazie alla computed book, il componente si aggiorna automaticamente per mostrare i dettagli del nuovo libro selezionato.
    // senza usare effect(), il metodo setBookId viene chiamato solo una volta al momento della creazione del componente, e non si aggiorna più quando l'id cambia. Invece, con signalMethod, il metodo setBookId viene chiamato ogni volta che l'id cambia, aggiornando lo stato dello store di conseguenza e mantenendo il componente sincronizzato con l'input ricevuto.
  }
  
}
