import { Component } from '@angular/core';
import { AccesoService } from '../../services/acceso.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({

  selector: 'app-inicio',
  standalone: true,
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',

  imports: [
    MatButtonModule 
  ]
})
export class InicioComponent {


constructor(private router: Router) {}

  registrarse(): void {
    this.router.navigate(['registro']);
  }
  
    jugar(): void{
      this.router.navigate(["jugar"]);
    }



}
