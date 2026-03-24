import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes, 
      // fornisce le rotte definite in app.routes.ts al router di Angular
      withComponentInputBinding() 
      // quando si configura il router così, 
      // Angular si occupa automaticamente di associare i parametri della rotta agli input dei componenti, 
      // semplificando la gestione dei dati passati tramite l'URL
    )
  ]
};
