import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feet.component.html',
  styleUrls: ['./feet.component.sass'],
})
export class FeetComponent {
  @Input() currentPlayer: 'red' | 'blue' = 'red';
  @Input() redPlayerName: string = '';
  @Input() bluePlayerName: string = '';
}
