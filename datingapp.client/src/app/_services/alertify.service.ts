import { Injectable } from '@angular/core';
declare let alertify: any;


//since we added alertify in angular.json, it is globaly available in our app
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  confirm(message: string, okCallback: () => any) {
    alertify.confirm(message, function(e: any) {
      if(e) { //e is OK button click event
        okCallback();
      } else {}
    });
  }
  //all these are wrapers around alertify methods
  success(message: string) {
    alertify.success(message);
  }

  error(message: string) {
    alertify.error(message);
  }

  warning(message: string) {
    alertify.warning(message);
  }

  message(message: string) {
    alertify.message(message);
  }
}
