import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PlayerSetupComponent } from './components/player-setup/player-setup.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { GameBoardComponent } from './components/game-board/game-board.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  imports: [
    CommonModule,
    RouterModule,
    PlayerSetupComponent,
    HeaderComponent,
    SidebarComponent,
    GameBoardComponent
  ]
})
export class AppComponent {
  playerNames: { red: string; blue: string } | null = null;
  currentPlayer: 'red' | 'blue' = 'red';
  
  onPlayersSet(players: { red: string; blue: string }) {
    console.log("Nombres recibidos:", players);
    this.playerNames = players;
  }
onPlayerChange(player: 'red' | 'blue') {
    this.currentPlayer = player;
  }

  scores: { red: number; blue: number } = { red: 0, blue: 0 };
  onScoreChange(scores: { red: number; blue: number }) {
    this.scores = scores;
  }
  
}
