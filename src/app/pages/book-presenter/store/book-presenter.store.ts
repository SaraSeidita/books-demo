import { patchState, signalMethod, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { initialBookPresenterSlice } from "./book-presenter.slice";
import { computed } from "@angular/core";
import { BOOKS_COLLECTION } from "../../../data/books-collection";


export const BookPresenterStore = signalStore(
    withState(initialBookPresenterSlice), // stato dello store iniziale
    withComputed(store => ({
        book: computed(() => BOOKS_COLLECTION[store.selectedBookId()]) // restituisce il libro selezionato in base all'id
    })),
    withMethods(store => ({

        // utilizzo signalMethod
        setBookId: signalMethod<number>(id => 
            patchState(store, {selectedBookId: id})
        ) 
        // metodo per aggiornare l'id del libro selezionato nello stato dello store
        // non mi serve più usare effect()
    }))
)