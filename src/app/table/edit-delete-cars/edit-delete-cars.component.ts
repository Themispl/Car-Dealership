import { Component, Output, EventEmitter, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cars } from '../../shered/abstractions/Icar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import{ReactiveFormsModule,FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-edit-delete-cars',
  standalone: true,
  imports: [ReactiveFormsModule,MatFormFieldModule,CommonModule, MatInputModule, MatButtonModule],
  templateUrl: './edit-delete-cars.component.html',
  styleUrl: './edit-delete-cars.component.scss'
})
export class EditDeleteCarsComponent {

  @Input() car: Cars | null = null; 
  @Output() save = new EventEmitter<Cars>(); 
  @Output() cancel = new EventEmitter<void>(); 
  public isEditMode: boolean = false;
  public carForm: FormGroup;
  
  private fb = inject(FormBuilder)
 

  constructor() {
    this.carForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      fuelCategory: ['', Validators.required],
      manufacturer: ['', Validators.required],
    });
  }

  ngOnChanges(): void {
    if (this.car) {
      this.carForm.setValue({
        id: this.car.id,
        fuelCategory: this.car.fuelCategory,
        manufacturer: this.car.manufacturer,
      });
    }
  }

  onSave(): void {
    if (this.carForm.valid) {
      const updatedCar: Cars = {
        ...this.car,
        ...this.carForm.getRawValue(),
      };
      this.save.emit(updatedCar); 
    }
  }

  onCancel(): void {
    this.cancel.emit(); 
  }
}

