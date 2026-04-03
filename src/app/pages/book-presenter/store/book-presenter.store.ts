import { patchState, signalMethod, signalStore, type, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { initialBookPresenterSlice } from "./book-presenter.slice";
import { computed } from "@angular/core";
import { BOOKS_COLLECTION } from "../../../data/books-collection";
import { entityConfig, setAllEntities, updateEntity, withEntities } from "@ngrx/signals/entities";
import { Book } from "../../../models/book";

// proviamo con entityConfig 

const bookConfig = entityConfig({ // config per gestire le entità di tipo Book nello store
    // riceve un oggetto che definisce gli aspetti delle entità 
    // poi usiamo la stessa configurazione ogni volta che accediamo alla funzione
    entity: type<Book>(), // specifica il tipo di entità che gestisce lo store, in questo caso Book
    collection: '_booksPopone', // nome della collezione di entità nello stato dello store, in questo caso '_booksPopone'
    selectId: book => book.id // funzione che specifica come identificare univocamente ogni entità, in questo caso usando l'id del libro
})


export const BookPresenterStore = signalStore(
    withState(initialBookPresenterSlice), // stato dello store iniziale
    withEntities(bookConfig),// prima usavo <book> per specificare il tipo di entità che gestisce lo store
        // adesso uso <bookConfig> per specificare la configurazione delle entità, che include anche il tipo di entità e altre informazioni utili per gestirle nello store
        // si usa () e non <> perché withEntities riceve un oggetto di configurazione, e non un tipo generico, quindi passo direttamente l'oggetto bookConfig come argomento della funzione withEntities
    // lo aggiungo prima di withComputed perché se lo mettessi dopo, non potrei accedere allo stato aggiornato nello store all'interno della computed
    withComputed(store => ({
        // book: computed(() => BOOKS_COLLECTION[store.selectedBookId()]) // restituisce il libro selezionato in base all'id
        book: computed(() => store._booksPoponeEntityMap()[store.selectedBookId()])
    })),
    withMethods(store => ({
        // utilizzo signalMethod
        setBookId: signalMethod<number>(id => 
            patchState(store, {selectedBookId: id})
        ),
        // metodo per aggiornare l'id del libro selezionato nello stato dello store
        // non mi serve più usare effect()

        // voglio aggiungere un metodo per rinominare il libro corrente 
        renameCorrentBook: (name: string) => {
            // voglio usare bookConfig e withEntities
            // uso updateEntity per aggiornare il libro corrente, specificando l'id del libro da aggiornare e le modifiche da apportare
            patchState(store, updateEntity( 
                {id: store.selectedBookId(), // id del libro da aggiornare, che è l'id del libro selezionato nello stato dello store
                changes: {title: name} // modifiche da apportare al libro, in questo caso solo il titolo, ma potrei aggiornare anche altri campi del libro se volessi
                } 
                , bookConfig))
        }
    })),
    withHooks(store => ({
        onInit: () => {
            // voglio aggiungere tutti i libri come entità 
            console.log('onInit');
            patchState(store ,
                // ci sono un sacco di funzioni di entities, come addAll, addOne, updateOne, removeOne, ecc. che permettono di gestire le entità nello store in modo semplice e performante
                setAllEntities(BOOKS_COLLECTION, bookConfig) // aggiunge tutti i libri della collezione come entità nello store, in modo da poterle gestire facilmente con le funzioni di entities
            ) // aggiungo bookConfig perché ho cambiato la configurazione delle entità, e ora devo specificare quale configurazione usare per aggiungere le entità nello store
            // console.log('entities', store.entities()); // logga le entità per verificare che siano state aggiunte correttamente
            console.log('books', store._booksPoponeIds()); // logga la collezione di libri per verificare che siano stati aggiunti correttamente
        }
    }))
)