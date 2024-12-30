import { Component, OnInit, inject } from '@angular/core';
import { CarsService } from '../shered/abstractions/services/CarsService';
import { Cars } from '../shered/abstractions/Icar';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import{ReactiveFormsModule,FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { RouterModule} from '@angular/router';
import { EditDeleteCarsComponent } from './edit-delete-cars/edit-delete-cars.component';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatCardModule,MatListModule, MatFormFieldModule, MatInputModule,
    EditDeleteCarsComponent,RouterModule, FormsModule, CommonModule, ReactiveFormsModule,
    MatTableModule, MatButtonModule, MatIconModule, MatSortModule, MatSort],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {

  private service = inject(CarsService)
  private fb = inject(FormBuilder)

  public carsList: Cars[] = [];
  public selectedCar: Cars | null = null;
  public searchCarId: Cars | null = null;
  public searchForm: FormGroup;
  public isEditFormVisible = false;
  public isAddFormVisible = false;
  public carForm: FormGroup;


  constructor() {
    this.carForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      fuelCategory: ['', Validators.required],
      manufacturer: ['', Validators.required],
    });

    this.searchForm = this.fb.group({
      searchId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCars();
  }


  private loadCars(): void {
    this.service.getCarsList().subscribe({
      next: (data: Cars[]) => {
        this.carsList = data; 
      },
      error: (err) => {
        console.error('Error loading cars:', err);
      }
    });
  }

  loadCarById(): void {
    const id = this.searchForm.get('searchId')?.value;
    if (!id) return;
    this.service.getCarById(id).subscribe({
      next: (car: Cars) => {
        this.searchCarId = car;
        console.log('Car details:', car);
      },
      error: (err) => {
        console.error('Error fetching car by ID:', err)
      }
    });
  }

  updateCar(id: number, updatedCar: Cars): void {
    this.service.updateCar(id, updatedCar).subscribe({
      next: (car: Cars) => {
        console.log('Car updated:', car);
        this.loadCars(); 
      },
      error: (err) => console.error('Error updating car:', err)
    });
  }

  deleteCar(id: number): void {
    this.service.deleteCar(id).subscribe({
      next: () => {
        console.log('Car deleted');
        this.loadCars(); 
      },
      error: (err) => console.error('Error deleting car:', err)
    });
  }

  hideEditCarForm(): void {
    this.isEditFormVisible = false;
  }

  showEditCarForm(car: Cars): void {
    this.selectedCar = car;
    this.isEditFormVisible = true;
    this.isAddFormVisible = false;
  }

  onCarSave(updatedCar: Cars): void {
    this.updateCar(updatedCar.id, updatedCar); 
    this.selectedCar = null; 
  }
  
  onEditCancel(): void {
    this.selectedCar = null; 
  }

  // onEditCarSubmit(): void {
  //   if (this.carForm.valid) {
  //     const updatedCar: Cars = this.carForm.getRawValue();
  //     this.service.updateCar(updatedCar.id, updatedCar).subscribe({
  //       next: () => {
  //         this.loadCars();
  //         this.hideEditCarForm();
  //       },
  //       error: (err) => console.error('Error updating car:', err),
  //     });
  //   }
  // }

  hideCard() {
    this.searchCarId = null; 
  }

  displayedColumns: string[] = ['id', 'fuelCategory', 'manufacturer', 'actions'];
  dataSource = new MatTableDataSource(this.carsList);
}