import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss',
})
export class InscriptionComponent {
  http: HttpClient = inject(HttpClient);
  formBuilder: FormBuilder = inject(FormBuilder);

  formulaire: FormGroup = this.formBuilder.group({
    email: ['a@a.com', [Validators.email, Validators.required]],
    password: ['root', [Validators.required]],
  });

  snackBar: MatSnackBar = inject(MatSnackBar);
  router: Router = inject(Router);

  onInscription() {
    if (this.formulaire.valid) {
      this.http
        .post(
          'http://localhost/backend_angular_devweb1_24/inscription.php',
          this.formulaire.value
        )
        .subscribe({
          next: (resultat: any) => {
            this.snackBar.open(
              'Vous êtes inscrit, veuillez vous connecter',
              undefined,
              {
                panelClass: 'snack-bar-valid',
                duration: 3000,
              }
            );

            this.router.navigateByUrl('/connexion');
          },
          error: (erreur: any) => {
            //si l'email est déjà existant
            if (erreur.status == 409) {
              this.snackBar.open('Cet email est déjà utilisé', undefined, {
                panelClass: 'snack-bar-warning',
                duration: 3000,
              });
            } else {
              this.snackBar.open(
                "Erreur inconnue, veuillez contacter l'administrateur",
                undefined,
                {
                  panelClass: 'snack-bar-error',
                  duration: 3000,
                }
              );
            }
          },
        });
    }
  }
}
