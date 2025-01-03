import { Component, inject  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from './shered/abstractions/services/user.service';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ FormsModule, CommonModule, RouterOutlet, MatIcon], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'firstTable';
  router= inject(Router);
  userService = inject(UserService);

  user = this.userService.user;

  Logout(){
    this.userService.logoutUser();
  }

  onLogin(): void {  
    this.router.navigate(['/user-login']);
  }

  
}
