import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { appsettings } from '../settings/appsettings';
import { Puntaje } from '../components/interfacesUsuarios/Puntaje';
import { MostrarPuntaje } from '../components/interfacesUsuarios/MostrarPuntaje';



@Injectable({
  providedIn: 'root',
})
export class PuntajeService {
private http = inject(HttpClient);
private baseUrl: string = appsettings.apiUrl;




  constructor() {}

  guardarPuntaje(puntaje: Puntaje): Observable<MostrarPuntaje> {
    return this.http.post<MostrarPuntaje>(`${this.baseUrl}/aciertos`, puntaje);
  }



LitaPuntajes(): Observable<MostrarPuntaje[]> {
  return this.http.get<MostrarPuntaje[]>(`${this.baseUrl}/aciertos`);
}


}
