import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {

  connecte: boolean = localStorage.getItem("jwt") != null;

  constructor() {
  }
}
