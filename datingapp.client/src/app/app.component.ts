import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private authService: AuthService) {}

  //to fix error with populating decodedToken on login(), we use parent component (AppComponent)
  ngOnInit() {
    //when App component loads, find token 
    const token = localStorage.getItem('token');
    if(token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }

  title = 'datingapp.client';
}
