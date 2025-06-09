import { RegistroService } from './../../services/registro.service';
import { MostrarUsuarios } from './../interfacesUsuarios/MostrarUsuario';
import { Component, Output, OnInit, EventEmitter, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Registro } from '../interfacesUsuarios/Registro';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-player-setup',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './player-setup.component.html',
  styleUrls: ['./player-setup.component.css'],
})
export class PlayerSetupComponent{
  redName: string | null = null;
  blueName: string | null = null;

  @Output() playersSet = new EventEmitter<{
  names: { red: string; blue: string };
  ids: { red: number; blue: number };
}>();


  mostrarUsuario!: MostrarUsuarios[];
   private registroService = inject(RegistroService);
  constructor(private router: Router) {
    

    this.registroService.listao().subscribe({
      next: (response) => {
        this.mostrarUsuario = response;
        console.log('Usuarios obtenidos:', response);
      },
      error: (err) => {
        console.error('Error al obtener usuarios:', err);
      }
    });
  
  


}

startGame() {
  if (this.redName && this.blueName && this.redName !== this.blueName) {
    const redUser = this.mostrarUsuario.find(u => u.name === this.redName);
    const blueUser = this.mostrarUsuario.find(u => u.name === this.blueName);

    if (!redUser || !blueUser) {
      alert('No se encontraron los usuarios seleccionados.');
      return;
    }

    this.playersSet.emit({
      names: { red: this.redName, blue: this.blueName },
      ids: { red: redUser.id, blue: blueUser.id }
    });
  } else {
    alert('Debe seleccionar jugadores diferentes para ambos equipos.');
  }
}

  volver(): void {
    this.router.navigate(['']);
  }
 
}