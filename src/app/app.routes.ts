import { Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { HomepageComponent } from './homepage/homepage.component';
import { EditDeleteCarsComponent } from './table/edit-delete-cars/edit-delete-cars.component';
import { NewEntryComponent } from './table/new-entry/new-entry.component';
import { CarTableComponent } from './car-table/car-table.component';
import { NewEntryComponentCar } from './car-table/new-entry/new-entry.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { authGuard } from './shered/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo:'/homepage', pathMatch:'full'},
    {path: 'table', component: TableComponent, canActivate:[authGuard]},
    {path: 'homepage', component: HomepageComponent},
    {path: 'app-edit-delete-cars', component: EditDeleteCarsComponent, canActivate:[authGuard]},
    {path:'app-new-entry', component: NewEntryComponent, canActivate:[authGuard]},
    {path:'cartable', component: CarTableComponent, canActivate:[authGuard]},
    {path:'app-new-entry-car', component: NewEntryComponentCar, canActivate:[authGuard]},
    {path:'user-login', component: UserLoginComponent},
];
