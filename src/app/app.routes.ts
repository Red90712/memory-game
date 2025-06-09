import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { JuegoPrincipalComponent } from './juegos/juego-principal/juego-principal.component';



export const routes: Routes = [

{path:"", component:InicioComponent},
{path:"registro", component:RegistroComponent},
{path:"jugar", component:JuegoPrincipalComponent},


];
