// src/app/services/partida.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Partida } from '../components/interfacesUsuarios/Partida';
import { appsettings } from '../settings/appsettings';

@Injectable({
  providedIn: 'root',
})
export class PartidaService {
  private http = inject(HttpClient);
  private baseUrl = appsettings.apiUrl;

  crearPartida(partida: Partida): Observable<any> {
    return this.http.post(`${this.baseUrl}/partidas`, partida);
  }
}
