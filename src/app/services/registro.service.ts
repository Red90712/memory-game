import { Injectable, inject, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appsettings } from '../settings/appsettings';
import { Observable } from 'rxjs';
import { ResponseUsuario } from '../components/interfacesUsuarios/ResponseUsuario';
import { MostrarUsuarios } from '../components/interfacesUsuarios/MostrarUsuario';
import { Registro } from '../components/interfacesUsuarios/Registro';
import { ResponseAcceso } from '../components/interfacesUsuarios/ResponseAcceso';




@Injectable({
  providedIn: 'root'
})
export class RegistroService {

private http = inject(HttpClient);
private baseUrl: string = appsettings.apiUrl;
constructor() { }

     listao() : Observable<MostrarUsuarios[]>{
          return  this.http.get<MostrarUsuarios[]>(`${this.baseUrl}/users`)

     }
     registrarse(objeto: Registro): Observable<ResponseAcceso> {
         return this.http.post<ResponseAcceso>(`${this.baseUrl}/users`, objeto);
       }

       

    
  
}
