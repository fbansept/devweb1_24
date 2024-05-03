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
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-produit',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
  ],
  templateUrl: './edit-produit.component.html',
  styleUrl: './edit-produit.component.scss',
})
export class EditProduitComponent {
  formBuilder: FormBuilder = inject(FormBuilder);
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);

  idProduit: number | null = null;
  imageExistanteBdd: string | null = null;
  suppressionImageExistanteBdd: boolean = false;

  ngOnInit() {
    this.route.params.subscribe((parametres) => {
      //si un id existe dans l'URL et que c'est un nombre
      if (parametres['id'] != null && !isNaN(parametres['id'])) {
        this.idProduit = parametres['id'];

        this.http
          .get(
            `http://localhost/backend_angular_devweb1_24/produit.php?id=${this.idProduit}`
          )
          .subscribe((produit: any) => {
            this.formulaire.patchValue(produit);
            this.imageExistanteBdd = produit.image;
          });
      }
    });
  }

  formulaire: FormGroup = this.formBuilder.group({
    nom: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
    description: ['', []],
    prix: [1, [Validators.required, Validators.min(0.01)]],
  });

  fichierSelectionne: File | null = null;

  onAjoutProduit() {
    const data = new FormData();

    data.append('produit', JSON.stringify(this.formulaire.value));

    if (this.suppressionImageExistanteBdd) {
      data.append('supprimer_image', 'true');
    }

    if (this.fichierSelectionne) {
      data.append('image', this.fichierSelectionne);
    }

    if (this.formulaire.valid) {
      const url: string = this.idProduit
        ? `http://localhost/backend_angular_devweb1_24/modifier-produit.php?id=${this.idProduit}`
        : 'http://localhost/backend_angular_devweb1_24/ajout-produit.php';

      this.http
        .post(url, data)
        .subscribe((resultat) => this.router.navigateByUrl('/accueil'));
    }
  }

  onSelectionFichier(evenement: any) {
    this.fichierSelectionne = evenement.target.files[0];

    // //si on change d'image et qu'il en existe une dans la bdd, on demande sa suppression.
    // if (this.imageExistanteBdd != null && this.imageExistanteBdd != '') {
    //   this.suppressionImageExistanteBdd = true;
    // }
  }

  onSuppressionImage() {
    this.suppressionImageExistanteBdd = true;
  }
}
