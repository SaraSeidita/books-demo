import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: 'books/0', pathMatch: 'full'}, // reindirizza alla pagina del libro con id 0 quando l'url è vuoto
    {path: 'books/:id', loadComponent: () => import('./pages/book-presenter/book-presenter').then(m => m.BookPresenter)} // definisce la rotta per visualizzare un libro specifico in base al suo id
];
