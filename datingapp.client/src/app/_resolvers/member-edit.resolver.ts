import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { User } from "../_models/user";
import { UserService } from "../_services/user.service";
import { AlertifyService } from "../_services/alertify.service";
import { catchError, Observable, of } from "rxjs";
import { AuthService } from "../_services/auth.service";


@Injectable({
    providedIn: 'root'
  }) 
export class MemberEditResolver implements Resolve<User | null> {
    
    constructor(private userService: UserService, private router: Router, 
      private alertify: AlertifyService, private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User | null> {
         return this.userService.getUser(this.authService.decodedToken.nameid).pipe(catchError(error => {     //pipe() is for catching and resolvng the error
            this.alertify.error('Problem retrieving your data.');

            //than navigate to the members page
            this.router.navigate(['/members']);
            return of(null);
         }));
    }
}