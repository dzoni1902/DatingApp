import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = "http://localhost:5000/api/auth/";

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
          }
        })
      )
  }

  //to use this method, we have to subscribe to it in our component
  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

}
