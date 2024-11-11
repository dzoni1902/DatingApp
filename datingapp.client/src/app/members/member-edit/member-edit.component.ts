import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { User } from '../../_models/user';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertifyService } from '../../_services/alertify.service';
import { every } from 'rxjs';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('userForm') userForm!: NgForm;
  user?: User;
  photoUrl?: string;
  isDirty = false;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if(this.userForm.dirty) {
      $event.returnValue = true;
    }
  }
  
  
  constructor(private route: ActivatedRoute, private alertify: AlertifyService, 
              private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  ngAfterViewInit() {
    this.userForm.valueChanges?.subscribe(() => {
      this.isDirty = !!this.userForm?.dirty;
    });
  }

  updateUser() {
    if (this.user) {
      const userId = this.authService.decodedToken.nameid;
      this.userService.updateUser(userId, this.user).subscribe({
        next: () => {
          this.alertify.success('Profile updated successfully!');
          this.userForm.reset(this.user); // Reset form values to saved state
        },
        error: (error) => {
          const errorMessage = error.message || 'An error occurred'; 
          this.alertify.error(errorMessage);
        }
      });
    }
  }

  updateMainPhoto(photoUrl: string) {
    if (this.user) {
      this.user.photoUrl = photoUrl;
    }
  }
}
