import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';



import { SidebarComponent } from '../sidebar/sidebar.component';
import { PlayerSetupComponent } from '../player-setup/player-setup.component';


@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule, SidebarComponent, PlayerSetupComponent],
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.sass'],
})
export class GameBoardComponent {
  private imagePaths: string[] = [
    'https://i.ibb.co/5XtQNHJh/hamster-comiendo-112x112.png',
    'https://i.ibb.co/k2pM5y1C/hamster-llorando-112x112.png',
    'https://i.ibb.co/Kc2bBBKg/hamster-Zz-112x112.png',
    'https://i.ibb.co/pBn9CrHL/hamster-OH-112x112.png',
  ];

  // Variables del juego
  cards: string[] = [];
  flippedCards: number[] = [];
  matchedCards: number[] = [];
  currentPlayer: 'red' | 'blue' = 'red';
  scores: { red: number; blue: number } = { red: 0, blue: 0 };
  mistakeCount: number = 0;

  // Nombres de jugadores (se pasarán al Sidebar)
  @Input() redPlayerName: string = '';
  @Input() bluePlayerName: string = '';

  @Output() playerChange = new EventEmitter<'red' | 'blue'>();
  @Output() scoreChange = new EventEmitter<{ red: number; blue: number }>();
 


  playersSet = false;

setPlayerNames(names: { red: string; blue: string }) {
  this.redPlayerName = names.red;
  this.bluePlayerName = names.blue;
  this.playersSet = true;
}

  constructor() {
    this.initializeCards();
  }

  initializeCards() {
    const duplicated = [...this.imagePaths, ...this.imagePaths];
    this.cards = this.shuffle(duplicated);
  }

  shuffle(array: string[]): string[] {
    return array.sort(() => Math.random() - 0.5);
  }

  resetBoard() {
    // Reinicia la tabla: se vuelve a mezclar las cartas y se reinician los arrays.
    this.initializeCards();
    this.flippedCards = [];
    this.matchedCards = [];
  }

  flipCard(index: number) {
    // Evita voltear la misma carta o más de dos a la vez
    if (this.flippedCards.includes(index) || this.flippedCards.length === 2) {
      return;
    }

    this.flippedCards.push(index);

    if (this.flippedCards.length === 2) {
      const [firstIndex, secondIndex] = this.flippedCards;
      const firstCard = this.cards[firstIndex];
      const secondCard = this.cards[secondIndex];

      if (firstCard === secondCard) {
        // Coincidencia: se agregan a matchedCards y se reinicia flippedCards
        setTimeout(() => {
          this.matchedCards.push(firstIndex, secondIndex);
          this.flippedCards = [];
          this.checkForWin();
        }, 600);
      } else {
        // Error: se maneja la equivocación
        setTimeout(() => {
          this.handleMistake();
        }, 1000);
      }
    }
  }

  handleMistake() {
    this.mistakeCount++;
    // Se muestran temporalmente todas las cartas
    this.flippedCards = this.cards.map((_, i) => i);
    
    if (this.mistakeCount < 2) {
      // Si es la primera equivocación, se ocultan las cartas y se cambia el turno
      setTimeout(() => {
        this.flippedCards = [];
        this.togglePlayer();
      }, 1000);
    } else {
      // En la 2da equivocación se reinicia la tabla y se reinicia el contador
      setTimeout(() => {
        this.resetBoard();
        this.mistakeCount = 0;
        this.togglePlayer();
      }, 1000);
    }
  }

  checkForWin() {
    if (this.matchedCards.length === this.cards.length) {
      // Al completar la tabla se suman 5 puntos al jugador actual
      this.scores[this.currentPlayer] += 5;
      this.scoreChange.emit(this.scores);
      // Reinicia la tabla y el contador de equivocaciones
      
      this.resetBoard();
      this.mistakeCount = 0;
      this.togglePlayer();
    }
  }

  isFlipped(index: number): boolean {
    return (
      this.flippedCards.includes(index) ||
      this.matchedCards.includes(index)
    );
  }

  togglePlayer() {
    this.currentPlayer = this.currentPlayer === 'red' ? 'blue' : 'red';
    this.playerChange.emit(this.currentPlayer);
  }
}
