import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-score-sidebar',
  standalone: true,
  templateUrl: './score-sidebar.component.html',
  styleUrls: ['./score-sidebar.component.sass'],
})
export class ScoreSidebarComponent {
  @Input() scores: { red: number; blue: number } = { red: 0, blue: 0 };
}
