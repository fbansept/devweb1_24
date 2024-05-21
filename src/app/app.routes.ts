import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { Page404Component } from './page404/page404.component';
import { EditProduitComponent } from './edit-produit/edit-produit.component';
import { InscriptionComponent } from './inscription/inscription.component';

export const routes: Routes = [
  { path: 'accueil/:recherche', component: AccueilComponent },
  { path: 'accueil', component: AccueilComponent },

  { path: 'connexion', component: ConnexionComponent },
  { path: 'inscription', component: InscriptionComponent },

  { path: 'ajout-produit', component: EditProduitComponent },
  { path: 'modifier-produit/:id', component: EditProduitComponent },

  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: '**', component: Page404Component },
];
