import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { initialBookPresenterSlice } from "./book-presenter.slice";
import { computed } from "@angular/core";
import { BOOKS_COLLECTION } from "../../../data/books-collection";


export const BookPresenterStore = signalStore(
    withState(initialBookPresenterSlice), // stato dello store iniziale
    withComputed(store => ({
        book: computed(() => BOOKS_COLLECTION[store.selectedBookId()]) // restituisce il libro selezionato in base all'id
    })),
    withMethods(store => ({
        setBookId(id: number){
            patchState(store, {selectedBookId: id}); // aggiorna lo stato dello store con il nuovo id del libro selezionato
        }
    }))
)