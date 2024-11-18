import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../../_models/message';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  //we need to pass userId and recipientId to userService -> getMessageConversation
  //userId we have from authService and recipientId we can get from parent component, member-detail
  @Input() recipientId?: number;
  messages: Message[] = [];
  

  constructor(private userService: UserService, private alertify: AlertifyService, private authService: AuthService) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.userService.getMessageConversation(this.authService.decodedToken.nameid, this.recipientId!)
      .subscribe(messages => {
        this.messages = messages;
    }, error => {
      const errorMessage = error.message || 'An error occurred'; 
      this.alertify.error(errorMessage);
    })
  }

}
