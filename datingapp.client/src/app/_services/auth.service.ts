import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = "http://localhost:5000/api/auth/";
  jwtHepler = new JwtHelperService();

  //property to store our decoded token in AuthService
  decodedToken: any;

  //we need http module so we need to inject it here
  constructor(private http: HttpClient) { }

  //metod and model which we pass from the navbar
  login(model: any) {

    //here in service we replicate what we do in postman
    return this.http.post(this.baseUrl + 'login', model)
      .pipe(
        map( (response: any) => {
          //user will contain token object
          const user = response;
          if(user) {
            localStorage.setItem('token', user.token);

            //save token
            this.decodedToken = this.jwtHepler.decodeToken(user.token);
            console.log(this.decodedToken);
          }
        })
      )
  }

  //to use this method, we have to subscribe to it in our component
  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');

    return !this.jwtHepler.isTokenExpired(token);
  }

}
