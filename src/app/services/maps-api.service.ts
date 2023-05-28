import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { UserLocation } from '../interfaces/userlocation';

@Injectable({
  providedIn: 'root'
})
export class MapsApiService {
  private readonly baseURL = 'https://nominatim.openstreetmap.org/search?q='; //  Endpoint OpenStreetMap Nominatim API

  constructor(
    private http: HttpClient
  ) { }

  public getLatLong(city: string): Observable<UserLocation[]>{
    return this.http.get<UserLocation[]>(`${this.baseURL}${encodeURIComponent(city)}&format=json&limit=1`).pipe(
      catchError(error => {
        console.error(error);
        return EMPTY;
      })
    );
  }
}
