import { RegistroService } from './../../services/registro.service';
import { MostrarUsuarios } from './../interfacesUsuarios/MostrarUsuario';
import { Component, Output, EventEmitter, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Partida } from '../interfacesUsuarios/Partida';
import { PartidaService } from '../../services/partida.service';

@Component({
  selector: 'app-player-setup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './player-setup.component.html',
  styleUrls: ['./player-setup.component.css'],
})
export class PlayerSetupComponent {
  redName: string | null = null;
  blueName: string | null = null;

  readonly JUEGO_ID = '47a76327-cc0d-484a-a05d-54947f2c999d'; // ID del juego actual

  @Output() playersSet = new EventEmitter<{
    names: { red: string; blue: string };
    ids: { red: number; blue: number };
    partidaId: number;
  }>();

  mostrarUsuario!: MostrarUsuarios[];
  private registroService = inject(RegistroService);
  private partidaService = inject(PartidaService);

  constructor(private router: Router) {
    this.registroService.listao().subscribe({
      next: (response) => {
        //  Filtra solo los usuarios que pertenecen al juego
        this.mostrarUsuario = response.filter(user => user.juego_id === this.JUEGO_ID);
        console.log('👥 Usuarios filtrados por juego:', this.mostrarUsuario);
      },
      error: (err) => {
        console.error('❌ Error al obtener usuarios:', err);
      },
    });
  }

  startGame() {
    const redUser = this.mostrarUsuario.find(user => user.name === this.redName);
    const blueUser = this.mostrarUsuario.find(user => user.name === this.blueName);

    if (redUser && blueUser && redUser.id !== blueUser.id) {
      const nuevaPartida: Partida = {
        juego_id: this.JUEGO_ID,
        fecha: new Date().toISOString().split('T')[0],

        tiempo: 60,
        nivel: 'medio',
      };

      this.partidaService.crearPartida(nuevaPartida).subscribe({
        next: (respuesta: any) => {
          const partidaId = respuesta.id;
          this.playersSet.emit({
            names: { red: redUser.name, blue: blueUser.name },
            ids: { red: redUser.id, blue: blueUser.id },
            partidaId: partidaId,
          });
        },
        error: (err) => {
          console.error('❌ Error creando la partida:', err);
          alert('No se pudo crear la partida. Intenta nuevamente.');
        },
      });
    } else {
      alert('Debe seleccionar jugadores válidos y diferentes.');
    }
  }

  volver(): void {
    this.router.navigate(['']);
  }
}
