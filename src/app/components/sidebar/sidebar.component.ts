import {
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass'],
})
export class SidebarComponent{
  @Input() redPlayerName: string = '';
  @Input() bluePlayerName: string = '';
}
