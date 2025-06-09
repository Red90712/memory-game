import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-score-sidebar',
  standalone: true,
  templateUrl: './score-sidebar.component.html',
  styleUrls: ['./score-sidebar.component.css'],
})
export class ScoreSidebarComponent {
  @Input() scores!: { red: number; blue: number };  // objeto simple
}

