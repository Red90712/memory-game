import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  
  imports: [
    MatButtonModule 
  ]
})



export class LoginComponent {

  constructor(private router: Router) {}


  
}
