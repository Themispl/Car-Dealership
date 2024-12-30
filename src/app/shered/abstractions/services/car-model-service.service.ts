import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { carModel } from '../icar-model';


@Injectable({
  providedIn: 'root'
})
export class CarModelService {
  private url = 'https://localhost:7256/api/cars';

  http = inject(HttpClient);

  getCarModelList(): Observable<carModel[]> {
    return this.http.get<carModel[]>(this.url);
  }
  getCarModelById(id: number): Observable<carModel> {
    const url = `${this.url}/${id}`;
    return this.http.get<carModel>(url);
  }
  createCarModel(carModel: carModel): Observable<carModel> {
    return this.http.post<carModel>(this.url, carModel);
  }
  updateCarModel(id: number, carModel: carModel): Observable<carModel> {
    return this.http.put<carModel>(`${this.url}/${id}`, carModel);
  }
  deleteCarModel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
  
}
