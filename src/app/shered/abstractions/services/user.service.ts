import { Injectable, inject, signal, effect } from '@angular/core';
import { Credentials } from '../../abstractions/users';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from '../../abstractions/users';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);
  user= signal<UserLogin | null>(null);
  router = inject(Router);

  constructor(){
    const access_token = localStorage.getItem('access_token')
    if (access_token && access_token.split('.').length === 3) {
      try {
        const decodedToken: any = jwtDecode(access_token);
        console.log('Decoded Token:', decodedToken);
    
        if (decodedToken && decodedToken.email) {
          this.user.set({
            email: decodedToken.email,
           // password: '' // Optional: Do not include if unnecessary
          });
        } else {
          console.error('Decoded token does not contain email');
          this.user.set(null);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        this.user.set(null);
      }
    } else {
      console.warn('Invalid or missing token in localStorage');
      this.user.set(null);
    }
    effect(() => {
      if(this.user()){
        console.log("user loged in:",this.user().email);
      }else{
        console.log("user not loged in");
      }
    })
  }

  loginUser(credentials: Credentials) {
    return this.http.post<{access_token: string}>('https://localhost:7256/login', credentials);
  }

  logoutUser(){
    this.user.set(null);
    localStorage.removeItem('access_token');
    this.router.navigate(['/homepage']);
  }
}
