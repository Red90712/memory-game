import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';


import { PlayerSetupComponent } from './components/player-setup/player-setup.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { ScoreSidebarComponent } from './components/score-sidebar/score-sidebar.component';
import { FeetComponent } from './components/feet/feet.component';




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
    GameBoardComponent,
    ScoreSidebarComponent,
    FeetComponent
  ]
})
export class AppComponent {
  currentPlayer: 'red' | 'blue' = 'red';
  playerNames?: { red: string; blue: string };
  scores: { red: number; blue: number } = { red: 0, blue: 0 };

  constructor(private cdr: ChangeDetectorRef) {}

  onPlayersSet(players: { red: string; blue: string }) {
    console.log("Nombres recibidos:", players);
    this.playerNames = players;
  }
onPlayerChange(player: 'red' | 'blue') {
    this.currentPlayer = player;
  }

  onScoreChange(newScores: { red: number; blue: number }) {
    this.scores = { ...newScores };
  }

  
}
