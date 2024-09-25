import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  //here we will use auth service
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {  //on next means method was successfull
      console.log('Logged in successfully!');

    }, error => {
      console.log('Failed to login!');
    });
  }

  loggedIn() {
    const token = localStorage.getItem('token');

    return !!token;   //if not empty return true
  }

  logout() {
    localStorage.removeItem('token');
    console.log('logged out!')
  }
}
