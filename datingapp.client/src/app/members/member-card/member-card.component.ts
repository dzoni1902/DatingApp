import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})

//this will be child component of MemberListComponent
export class MemberCardComponent implements OnInit {
  @Input() user?: User;

  constructor(private userService: UserService, private alertify: AlertifyService, private authService: AuthService) { }

  ngOnInit() {
  }

  sendLike(recipientId: number) {
    if (recipientId !== undefined) {
        this.userService.sendLike(this.authService.decodedToken.nameid, recipientId).subscribe(
            data => {
                this.alertify.success('You have liked: ' + this.user?.knownAs);
            },
            error => {
              const errorMessage = error.message || 'An error occurred'; 
              this.alertify.error(errorMessage);
            }
        );
    } else {
        this.alertify.error('User ID is undefined.');
    }
  }
}
