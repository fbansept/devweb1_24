import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

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

  onInscription() {
    if (this.formulaire.valid) {
      this.http
        .post(
          'http://localhost/backend_angular_devweb1_24/inscription.php',
          this.formulaire.value
        )
        .subscribe((resultat: any) => console.log(resultat));
    }
  }
}
