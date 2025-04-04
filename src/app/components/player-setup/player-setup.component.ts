import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-player-setup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './player-setup.component.html',
  styleUrls: ['./player-setup.component.sass'],
})
export class PlayerSetupComponent {
  redName: string = '';
  blueName: string = '';

  @Output() playersSet = new EventEmitter<{ red: string; blue: string }>();

  startGame() {
    if (this.redName.trim() && this.blueName.trim()) {
      this.playersSet.emit({ red: this.redName, blue: this.blueName });
    }
  }
}
