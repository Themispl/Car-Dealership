import { Component, inject } from '@angular/core';
import{ReactiveFormsModule,FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Cars } from '../../shered/abstractions/Icar';
import { RouterModule, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CarsService } from '../../shered/abstractions/services/CarsService';

@Component({
  selector: 'app-new-entry',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule, CommonModule,
     MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './new-entry.component.html',
  styleUrl: './new-entry.component.scss'
})
export class NewEntryComponent {
 private CarService = inject(CarsService)
 private router = inject(Router)
 private fb = inject(FormBuilder)

  public newItem: Cars = {id:0, fuelCategory: '', manufacturer: '' };

  public addCarForm: FormGroup;
  public isAddFormVisible = false;

  constructor() {
    this.addCarForm = this.fb.group({
      fuelCategory: [this.newItem.fuelCategory, Validators.required],
      manufacturer: [this.newItem.manufacturer, Validators.required],
    });
  }

  showAddCarForm(): void {
    this.isAddFormVisible = true;
      this.addCarForm.reset(); 
  }

  submitForm(): void {
    if (this.addCarForm.valid) {
      this.newItem = this.addCarForm.value; 
      this.CarService.createCar(this.newItem).subscribe({
        next: (createdCar) => {
          console.log('Car created:', createdCar);
          this.router.navigate(['/table']); 
        },
        error: (err) => {
          console.error('Error creating car:', err);
        }
      });
    } 
  }
}
