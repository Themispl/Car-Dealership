import { Credentials } from './../shered/abstractions/users';
import { Component, inject } from '@angular/core';
import { FormControl,FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { UserService } from '../shered/abstractions/services/user.service';
import { Router } from '@angular/router';
import{jwtDecode} from 'jwt-decode';
import { UserLogin } from '../shered/abstractions/users';

@Component({
  selector: 'app-user-login',
  imports: [ReactiveFormsModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss'
})
export class UserLoginComponent {
  userService = inject(UserService);
  router = inject(Router);
  invalidLogin = false;

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  onSubmit(){
    const credentials = this.form.value as Credentials;

    this.userService.loginUser(credentials).subscribe(
      {next: (res)=>{const acces_token = res.access_token;
      console.log(acces_token);
      localStorage.setItem('access_token', acces_token);

      const decodedToken = jwtDecode(acces_token).sub as unknown as UserLogin;
      console.log(decodedToken);

      this.userService.user.set({
        fullname: decodedToken.fullname,
        password: decodedToken.password
      });
      this.router.navigate(['/homepage']);
    },
    error: (error) => {
      console.log(error);
      this.invalidLogin = true;
    }
  });
    
  }

}
