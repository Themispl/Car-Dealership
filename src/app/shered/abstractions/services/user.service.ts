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
    if (access_token){
      const decodedToken = jwtDecode(access_token)
      .sub as unknown as UserLogin
      this.user.set({
        fullname: decodedToken.fullname,
        password: decodedToken.password
      })
    }
    effect(() => {
      if(this.user()){
        console.log("user loged in:",this.user().fullname);
      }else{
        console.log("user not loged in");
      }
    })
  }

  loginUser(credentials: Credentials) {
    return this.http.post<{access_token: string}>('http://localhost:3000/login', credentials);
  }

  logoutUser(){
    this.user.set(null);
    localStorage.removeItem('access_token');
    this.router.navigate(['/home']);
  }
}
