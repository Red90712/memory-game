import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule],
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

  cards: string[] = [];
  flippedCards: number[] = [];
  matchedCards: number[] = [];
  currentPlayer: 'red' | 'blue' = 'red';
  scores: { red: number; blue: number } = { red: 0, blue: 0 };

  @Input() playerNames!: { red: string; blue: string };

  @Output() playerChange = new EventEmitter<'red' | 'blue'>();
  @Output() scoreChange = new EventEmitter<{ red: number; blue: number }>();

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

  flipCard(index: number) {
    if (
      this.flippedCards.includes(index) ||
      this.matchedCards.includes(index) ||
      this.flippedCards.length === 2
    ) {
      return;
    }

    this.flippedCards.push(index);

    if (this.flippedCards.length === 2) {
      const [firstIndex, secondIndex] = this.flippedCards;
      const firstCard = this.cards[firstIndex];
      const secondCard = this.cards[secondIndex];

      if (firstCard === secondCard) {
        setTimeout(() => {
          this.matchedCards.push(firstIndex, secondIndex);
          this.flippedCards = [];

          this.scores = {
            ...this.scores,
            [this.currentPlayer]: this.scores[this.currentPlayer] + 1,
          };
          this.scoreChange.emit(this.scores);
          console.log('📤 Puntaje actualizado:', this.scores);

          // ✅ Verifica si ya todas las cartas fueron emparejadas
          if (this.matchedCards.length === this.cards.length) {
            this.showWinner();
          }
        }, 500);
      } else {
        setTimeout(() => {
          this.flippedCards = [];
          this.togglePlayer();
        }, 1000);
      }
    }
  }

  showWinner() {
    const redScore = this.scores.red;
    const blueScore = this.scores.blue;

    let message = '';
    if (redScore > blueScore) {
      message = `🏆 ¡Ganó ${this.playerNames.red}!`;
    } else if (blueScore > redScore) {
      message = `🏆 ¡Ganó ${this.playerNames.blue}!`;
    } else {
      message = '🤝 ¡Empate!';
    }

    Swal.fire({
      title: message,
      text: `Puntajes finales — ${this.playerNames.red}: ${redScore}, ${this.playerNames.blue}: ${blueScore}`,
      icon: 'success',
      confirmButtonText: 'Volver a jugar',
    }).then(() => {
      location.reload();
    });
  }

  isFlipped(index: number): boolean {
    return (
      this.flippedCards.includes(index) || this.matchedCards.includes(index)
    );
  }

  togglePlayer() {
    this.currentPlayer = this.currentPlayer === 'red' ? 'blue' : 'red';
    this.playerChange.emit(this.currentPlayer);
  }
}
