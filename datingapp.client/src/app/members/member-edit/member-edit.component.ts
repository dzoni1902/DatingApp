import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { User } from '../../_models/user';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertifyService } from '../../_services/alertify.service';
import { every } from 'rxjs';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('userForm') userForm!: NgForm;
  user?: User;
  isDirty = false;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if(this.userForm.dirty) {
      $event.returnValue = true;
    }
  }
  
  
  constructor(private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
  }

  ngAfterViewInit() {
    this.userForm.valueChanges?.subscribe(() => {
      this.isDirty = !!this.userForm?.dirty;
    });
  }

  updateUser() {
    console.log(this.user);
    this.alertify.success('Profile updated!');
    this.userForm.reset(this.user);  //reset to form values to what they are as they are saved
  }
}
