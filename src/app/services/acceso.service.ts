import { MostrarUsuarios } from './../components/interfacesUsuarios/MostrarUsuario';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { appsettings } from '../settings/appsettings';
import { Registro } from '../components/interfacesUsuarios/Registro';
import { ResponseAcceso } from '../components/interfacesUsuarios/ResponseAcceso';
import { GameBoardComponent } from '../components/game-board/game-board.component';
import { JuegoPrincipalComponent } from '../juegos/juego-principal/juego-principal.component';



@Injectable({
providedIn: 'root'
})

export class AccesoService {
private http = inject(HttpClient);
private baseUrl: string = appsettings.apiUrl;

constructor() {}

  registrarse(objeto: Registro): Observable<ResponseAcceso> {
    return this.http.post<ResponseAcceso>(`${this.baseUrl}/users`, objeto);
  }

  jugar(objeto: JuegoPrincipalComponent): Observable<ResponseAcceso> {
    return this.http.post<ResponseAcceso>(`${this.baseUrl}/partidas`, objeto);
  }

}

