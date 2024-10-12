import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { User } from "../_models/user";
import { UserService } from "../_services/user.service";
import { AlertifyService } from "../_services/alertify.service";
import { catchError, Observable, of } from "rxjs";


@Injectable({
    providedIn: 'root'
  }) 
export class MemberListResolver implements Resolve<User[] | null> {
    
    constructor(private userService: UserService, private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User[] | null> {
         return this.userService.getUsers().pipe(catchError(error => {     //pipe() is for catching and resolvng the error
            this.alertify.error('Problem retrieving data.');

            //than navigate to the members page
            this.router.navigate(['/home']);
            return of(null);
         }));
    }
}