import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { PaginatedResult, Pagination } from '../_models/pagination';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: Message[] = [];
  pagination: Pagination  = { currentPage: 1, itemsPerPage: 5, totalItems: 0, totalPages: 1 };
  messageContainer = 'Unread';

  constructor(private userService: UserService, private alertify: AlertifyService, 
              private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {  //now we get the data before activating the route itself
    this.route.data.subscribe(data => {
      const paginatedResult: PaginatedResult<Message[]> = data['messages'];
      this.messages = paginatedResult.result ?? [];
      this.pagination = paginatedResult.pagination ?? this.pagination;
    });
    this.messageContainer = 'Unread';
  }

  pageChanged(event: PageChangedEvent): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }
  
  loadMessages() {               
    this.userService.getMessages(this.authService.decodedToken.nameid, this.pagination.currentPage, this.pagination.itemsPerPage, this.messageContainer)
      .subscribe(
        (res: PaginatedResult<Message[]>) => {
          this.messages = res.result ?? [];
          this.pagination = res.pagination ?? { currentPage: 1, itemsPerPage: 5, totalItems: 0, totalPages: 1 };
    }, error => {
      const errorMessage = error.message || 'An error occurred'; 
      this.alertify.error(errorMessage);
    });
  }
}
