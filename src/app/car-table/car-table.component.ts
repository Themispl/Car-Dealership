import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import{EditDeleteComponent} from './edit-delete/edit-delete.component'
import { carModel } from '../shered/abstractions/icar-model';
import { CarModelService } from '../shered/abstractions/services/car-model-service.service';

@Component({
  selector: 'app-car-table',
  standalone: true,
  imports: [ReactiveFormsModule,MatIconModule,MatFormFieldModule,
     MatSortModule, MatTableModule, CommonModule, ReactiveFormsModule,
    MatCardModule, MatFormFieldModule,MatListModule,RouterModule,
  EditDeleteComponent, MatInputModule, MatButtonModule],
  templateUrl: './car-table.component.html',
  styleUrl: './car-table.component.scss'
})
export class CarTableComponent {
  private service = inject(CarModelService);
  private fb = inject(FormBuilder)

  public carModelList: carModel[] = [];
  public carModelForm: FormGroup;
  public searchForm: FormGroup;
  public isEditFormVisible = false;
  public isAddFormVisible = false;
  public selectedCar: carModel | null = null;
  public searchCarId: carModel | null = null;

  constructor() {
    this.carModelForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      model: ['', Validators.required],
      price: ['', Validators.required],
      carCategoryId: ['', Validators.required],
    });
    this.searchForm = this.fb.group({
      searchId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCars();
  }

  private loadCars(): void {
      this.service.getCarModelList().subscribe({
        next: (data: carModel[]) => {
          this.carModelList = data; 
        },
        error: (err) => {
          console.error('Error loading cars:', err);
        }
      });
    }

    loadCarById(): void {
        const id = this.searchForm.get('searchId')?.value;
        if (!id) return;
        this.service.getCarModelById(id).subscribe({
          next: (car: carModel) => {
            this.searchCarId = car;
            console.log('Car details:', car);
          },
          error: (err) => {
            console.error('Error fetching car by ID:', err)
          }
        });
      }

    updateCar(id: number, updatedCar: carModel): void {
        this.service.updateCarModel(id, updatedCar).subscribe({
          next: (car: carModel) => {
            console.log('Car updated:', car);
            this.loadCars(); 
          },
          error: (err) => console.error('Error updating car:', err)
        });
      }

      deleteCarModel(id: number): void {
        this.service.deleteCarModel(id).subscribe({
          next: () => {
            console.log('Car deleted');
            this.loadCars(); 
          },
          error: (err) => console.error('Error deleting car:', err)
        });
      }

    showEditCarForm(car: carModel): void {
        this.selectedCar = car;
        this.isEditFormVisible = true;
        this.isAddFormVisible = false;
    }

    hideEditCarForm(): void {
      this.isEditFormVisible = false;
    }

     onCarSave(updatedCar: carModel): void {
        this.updateCar(updatedCar.id, updatedCar); 
        this.selectedCar = null; 
      }
      
      onEditCancel(): void {
        this.selectedCar = null; 
      }
    
      hideCard() {
        this.searchCarId = null; 
      }

     displayedColumns: string[] = ['id', 'model', 'price', 'carCategoryId', 'actions'];
      dataSource = new MatTableDataSource(this.carModelList);
}
