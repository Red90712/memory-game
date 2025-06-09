import { Component } from '@angular/core';



import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { AccesoService } from '../../services/acceso.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Registro } from '../../components/interfacesUsuarios/Registro';






@Component({
  selector: 'app-registro',
  standalone: true,
 imports: [MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})


export class RegistroComponent {

public formRegistro: FormGroup;

  constructor(
    private accesoService: AccesoService,
    private router: Router,
    private formBuild: FormBuilder
  ) {
    this.formRegistro = this.formBuild.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
      juego_id: ['47a76327-cc0d-484a-a05d-54947f2c999d', Validators.required],




    });
  }

  registrarse(): void {
    if (this.formRegistro.invalid) return;

    const objeto: Registro = {

      name: this.formRegistro.value.name,
      email: this.formRegistro.value.email,
      password: this.formRegistro.value.password,
      password_confirmation: this.formRegistro.value.password_confirmation,
      juego_id: this.formRegistro.value.juego_id

      
    };

  console.log("Datos enviados al backend:", objeto);
    this.accesoService.registrarse(objeto).subscribe({
      next: (data) => {
        if (data.isSuccess) {
          this.router.navigate(['']);
        } else {
          alert("Se registro con exito");
        }
      },
      error: (error) => {
        console.error('Error completo del backend:', error.error);

      }
    });
  }

  volver(): void {
    this.router.navigate(['']);
  }








  
}
