import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { UserService } from "../_services/user.service";
import { AlertifyService } from "../_services/alertify.service";
import { catchError, map, Observable, of } from "rxjs";
import { PaginatedResult } from "../_models/pagination";
import { Message } from "../_models/message";
import { AuthService } from "../_services/auth.service";

//we want to have data inside our roots before the component loads , thats we we use resolvers
@Injectable({
    providedIn: 'root'
  }) 
  export class MessagesResolver implements Resolve<PaginatedResult<Message[]> | null> {
    pageNumber = 1;
    pageSize = 5;
    messageContainer = 'Unread';
    
    constructor(private userService: UserService, 
                private router: Router, 
                private alertify: AlertifyService,
                private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<PaginatedResult<Message[]> | null> {
      return this.userService.getMessages(this.authService.decodedToken.nameid, this.pageNumber, this.pageSize, this.messageContainer).pipe(
        catchError(error => {
          this.alertify.error('Problem retrieving messages');
          this.router.navigate(['/']);
          return of(null);
        })
      );
    }
}
