import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../../_models/message';
import { AlertifyService } from '../../_services/alertify.service';
import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  //we need to pass userId and recipientId to userService -> getMessageConversation
  //userId we have from authService and recipientId we can get from parent component, member-detail**
  @Input() recipientId?: number;
  messages: Message[] = [];
  newMessage: any = {};

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

  sendMessage() {
    //we need to pass the recipientId in the body of what we are sending to the server
    this.newMessage.recipientId = this.recipientId;
    this.userService.sendMessage(this.authService.decodedToken.nameid, this.newMessage)
      .subscribe((message: Message) => {
        //we have to add the message to the start of the message array, not end
        this.messages.unshift(message);
        this.newMessage.content = '';
      }, 
      error => {
        const errorMessage = error.message || 'An error occurred'; 
        this.alertify.error(errorMessage);
      });
  }

}
