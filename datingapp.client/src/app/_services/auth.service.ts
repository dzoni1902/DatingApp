import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/'; 
  jwtHepler = new JwtHelperService();

  //property to store our decoded token in AuthService
  decodedToken: any;
  currentUser?: User;
  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  //we need http module so we need to inject it here
  constructor(private http: HttpClient) { }

  //when user logs in, we update the photoUrl
  changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }

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
            localStorage.setItem('user', JSON.stringify(user.user));
            //save token
            this.decodedToken = this.jwtHepler.decodeToken(user.token);
            this.currentUser = user.user;
            if(this.currentUser)
              this.changeMemberPhoto(this.currentUser.photoUrl);
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
