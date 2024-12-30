import { Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { HomepageComponent } from './homepage/homepage.component';
import { EditDeleteCarsComponent } from './table/edit-delete-cars/edit-delete-cars.component';
import { NewEntryComponent } from './table/new-entry/new-entry.component';
import { CarTableComponent } from './car-table/car-table.component';
import { NewEntryComponentCar } from './car-table/new-entry/new-entry.component';

export const routes: Routes = [
    { path: '', redirectTo:'/homepage', pathMatch:'full'},
    {path: 'table', component: TableComponent},
    {path: 'homepage', component: HomepageComponent},
    {path: 'app-edit-delete-cars', component: EditDeleteCarsComponent},
    {path:'app-new-entry', component: NewEntryComponent},
    {path:'cartable', component: CarTableComponent},
    {path:'app-new-entry-car', component: NewEntryComponentCar},
];
