import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import{ReactiveFormsModule,FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { carModel } from '../../shered/abstractions/icar-model';
import { CarModelService } from '../../shered/abstractions/services/car-model-service.service';

@Component({
  selector: 'app-new-entry',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, 
    MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './new-entry.component.html',
  styleUrl: './new-entry.component.scss'
})
export class NewEntryComponentCar {
  private service = inject(CarModelService);
  private router = inject(Router);
  private fb = inject(FormBuilder)

  private newItem: carModel = { id: 0, model: '', price: 0, carCategoryId: 0 };
  public addCarForm: FormGroup;
  public isAddFormVisible = false;

  constructor() {
    this.addCarForm = this.fb.group({
      model: [this.newItem.model, Validators.required],
      price: [this.newItem.price, Validators.required],
      carCategoryId: [this.newItem.carCategoryId, Validators.required],
    });
  }
  showAddCarForm(): void {
    this.isAddFormVisible = true;
    this.addCarForm.reset();
  }
  submitForm(): void {
    if (this.addCarForm.valid) {
      this.newItem = this.addCarForm.value;
      this.service.createCarModel(this.newItem).subscribe({
        next: (createdCar) => {
          console.log('Car created:', createdCar);
          this.router.navigate(['/cartable']);
        },
        error: (err) => {
          console.error('Error creating car:', err);
        }
      });
    }
  }
}
