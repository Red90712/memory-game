import { Component, Input, Output, EventEmitter, Signal, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { PuntajeService } from '../../services/puntaje.service';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css'],
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
  currentPlayer = signal<'red' | 'blue'>('red');
  scores = signal<{ red: number; blue: number }>({ red: 0, blue: 0 });
  inicioTiempo: number = Date.now();

  @Input() playerNames!: { red: string; blue: string };
  @Input() playerIds!: { red: number; blue: number };
  @Input() partidaId!: number;

  @Output() playerChange = new EventEmitter<'red' | 'blue'>();
  @Output() scoreChange = new EventEmitter<{ red: number; blue: number }>();

  constructor(private puntajeService: PuntajeService) {
    this.initializeCards();

    effect(() => {
      this.scoreChange.emit(this.scores());
      this.playerChange.emit(this.currentPlayer());
    });
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

          const player = this.currentPlayer();
          this.scores.update((s) => ({
            ...s,
            [player]: s[player] + 1,
          }));

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
    const { red, blue } = this.scores();
    const tiempoJugado = Math.floor((Date.now() - this.inicioTiempo) / 1000);

    const puntajeRojo = {
      partida_id: this.partidaId,
      user_id: this.playerIds.red,
      aciertos: red,
      tiempo: tiempoJugado,
    };

    const puntajeAzul = {
      partida_id: this.partidaId,
      user_id: this.playerIds.blue,
      aciertos: blue,
      tiempo: tiempoJugado,
    };

    console.log('🔴 Puntaje Rojo:', {
    partida_id: this.partidaId,
    user_id: this.playerIds.red,
    aciertos: red,
    tiempo: tiempoJugado
  });

    this.puntajeService.guardarPuntaje(puntajeRojo).subscribe({
      next: () => console.log('✅ Puntaje rojo guardado'),
      error: (err) => console.error('❌ Error guardando puntaje rojo', err),
    });


    console.log('🔵 Puntaje Azul:', {
    partida_id: this.partidaId,
    user_id: this.playerIds.blue,
    aciertos: blue,
    tiempo: tiempoJugado
  });

    this.puntajeService.guardarPuntaje(puntajeAzul).subscribe({
      next: () => console.log('✅ Puntaje azul guardado'),
      error: (err) => console.error('❌ Error guardando puntaje azul', err),
    });

    let message = '';
    if (red > blue) {
      message = `🏆 ¡Ganó ${this.playerNames.red}!`;
    } else if (blue > red) {
      message = `🏆 ¡Ganó ${this.playerNames.blue}!`;
    } else {
      message = '🤝 ¡Empate!';
    }

    Swal.fire({
      title: message,
      text: `Puntajes finales — ${this.playerNames.red}: ${red}, ${this.playerNames.blue}: ${blue}`,
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
    const next = this.currentPlayer() === 'red' ? 'blue' : 'red';
    this.currentPlayer.set(next);
  }
}
