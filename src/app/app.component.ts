import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PlayerSetupComponent } from './components/player-setup/player-setup.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

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

  
}
