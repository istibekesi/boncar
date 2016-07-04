import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
import { FIREBASE_PROVIDERS, defaultFirebase, firebaseAuthConfig, AuthProviders, AuthMethods } from 'angularfire2';
import { BONCAR_ROUTER_PROVIDERS } from './app/app.routes';


if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  FIREBASE_PROVIDERS,
  BONCAR_ROUTER_PROVIDERS,
  // Initialize Firebase app
  defaultFirebase({
    apiKey: "AIzaSyC2SF0T6cJUym7zbIlUfo2kq6kDMXgjrRc",
    authDomain: "project-8652230604760829170.firebaseapp.com",
    databaseURL: "https://project-8652230604760829170.firebaseio.com",
    storageBucket: "project-8652230604760829170.appspot.com",
  }),
  // Auth Config
  firebaseAuthConfig({
    provider: AuthProviders.Anonymous,
    method: AuthMethods.Anonymous
  })
]);

