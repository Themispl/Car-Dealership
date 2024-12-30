import { Component,Output, EventEmitter, Input, inject } from '@angular/core';
import{ReactiveFormsModule,FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { carModel } from '../../shered/abstractions/icar-model';


@Component({
  selector: 'app-edit-delete',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './edit-delete.component.html',
  styleUrl: './edit-delete.component.scss'
})
export class EditDeleteComponent {

  private fb = inject(FormBuilder)

  @Input() car: carModel | null = null;
  @Output() save = new EventEmitter<carModel>();
  @Output() cancel = new EventEmitter<void>();
  public isEditMode: boolean = false;
  public carForm: FormGroup;

  constructor() {
    this.carForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      model: ['', Validators.required],
      price: [0, Validators.required],
      carCategoryId: [0, Validators.required],
    });
  }

  ngOnChanges(): void {
    if (this.car) {
      this.carForm.setValue({
        id: this.car.id,
        model: this.car.model,
        price: this.car.price,
        carCategoryId: this.car.carCategoryId
      });
    }
  }

  onSave(): void {
      if (this.carForm.valid) {
        const updatedCar: carModel = {
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
