import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cars } from '../Icar';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  private url = 'https://localhost:7256/api/car-categories';

  http = inject(HttpClient);


  getCarsList(): Observable<Cars[]> {
    return this.http.get<Cars[]>(this.url);
  }
  getCarById(id: number): Observable<Cars> {
    const url = `${this.url}/${id}`;
    return this.http.get<Cars>(url);
  }

  createCar(car: Cars): Observable<Cars> {
    return this.http.post<Cars>(this.url, car);
  }

  updateCar(id: number, car: Cars): Observable<Cars> {
    return this.http.put<Cars>(`${this.url}/${id}`, car);
  }

  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

}
