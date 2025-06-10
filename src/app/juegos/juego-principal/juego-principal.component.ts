import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { PlayerSetupComponent } from '../../components/player-setup/player-setup.component';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { GameBoardComponent } from '../../components/game-board/game-board.component';
import { ScoreSidebarComponent } from '../../components/score-sidebar/score-sidebar.component';
import { FeetComponent } from '../../components/feet/feet.component';







@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './juego-principal.component.html',
  styleUrl: './juego-principal.component.css',
  imports: [
    CommonModule,
    RouterModule,
    PlayerSetupComponent,
    HeaderComponent,
    SidebarComponent,
    GameBoardComponent,
    ScoreSidebarComponent,
    FeetComponent
  ]   
})

export class JuegoPrincipalComponent {

currentPlayer: 'red' | 'blue' = 'red';
  scores: { red: number; blue: number } = { red: 0, blue: 0 };

 showGame = false; 

  playerNames!: { red: string; blue: string };
  playerIds!: { red: number; blue: number };
  partidaId!: number;

  handlePlayersSet(event: {
    names: { red: string; blue: string };
    ids: { red: number; blue: number };
    partidaId: number;
  }) {
    this.playerNames = event.names;
    this.playerIds = event.ids;
    this.partidaId = event.partidaId;
    this.showGame = true; // Muestra el juego luego de seleccionar jugadores
  }

  constructor(private cdr: ChangeDetectorRef) {}

  onPlayersSet(data: {
  names: { red: string; blue: string };
  ids: { red: number; blue: number };
  partidaId: number;
}) {
  this.playerNames = data.names;
  this.playerIds = data.ids;
  this.partidaId = data.partidaId;
  
}



onPlayerChange(player: 'red' | 'blue') {
    this.currentPlayer = player;
  }

  onScoreChange(newScores: { red: number; blue: number }) {
    this.scores = { ...newScores };
  }



}
