import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss',
})
export class AccueilComponent {
  http: HttpClient = inject(HttpClient);
  route: ActivatedRoute = inject(ActivatedRoute);

  listeProduit: any = [];

  snackBar: MatSnackBar = inject(MatSnackBar);

  ngOnInit() {
    this.route.params.subscribe((parametres) => {
      if (parametres['recherche']) {
        this.http
          .get(
            `http://localhost/backend_angular_devweb1_24/recherche-produit.php?recherche=${parametres['recherche']}`
          )
          .subscribe((listeProduit) => (this.listeProduit = listeProduit));
      } else {
        this.raffraichirListeProduit();
      }
    });
  }

  raffraichirListeProduit() {
    this.http
      .get('http://localhost/backend_angular_devweb1_24/liste-produit.php')
      .subscribe((listeProduit) => (this.listeProduit = listeProduit));
  }

  onClickSupprime(idProduit: number) {
    const jwt = localStorage.getItem('jwt');

    if (jwt != null) {
      this.http
        .delete(
          //'http://localhost/backend_angular_devweb1_24/supprimer-produit.php?id=' + idProduit
          `http://localhost/backend_angular_devweb1_24/supprimer-produit.php?id=${idProduit}`,
          {
            headers: { Authorization: jwt },
          }
        )
        .subscribe((resultat) => {
          this.raffraichirListeProduit();
          this.snackBar.open('Le produit a été supprimé', undefined, {
            panelClass: 'snack-bar-valid',
            duration: 3000,
          });
        });
    }
  }
}
