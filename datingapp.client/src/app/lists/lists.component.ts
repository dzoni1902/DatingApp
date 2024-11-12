import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { PaginatedResult, Pagination } from '../_models/pagination';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  users: User[] = [];
  pagination: Pagination  = { currentPage: 1, itemsPerPage: 5, totalItems: 0, totalPages: 1 };
  likesParam?: string;

  constructor(private userService: UserService, private alertify: AlertifyService, 
              private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {  //now we get the data before activating the route itself
    this.route.data.subscribe(data => {
      const paginatedResult: PaginatedResult<User[]> = data['users'];
      this.users = paginatedResult.result ?? [];
      this.pagination = paginatedResult.pagination ?? this.pagination;
    });
    this.likesParam = 'Likers';
  }

  pageChanged(event: PageChangedEvent): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  loadUsers() {               
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, null, this.likesParam)
      .subscribe(
        (res: PaginatedResult<User[]>) => {
          this.users = res.result ?? [];
          this.pagination = res.pagination ?? { currentPage: 1, itemsPerPage: 5, totalItems: 0, totalPages: 1 };
    }, error => {
      const errorMessage = error.message || 'An error occurred'; 
      this.alertify.error(errorMessage);
    });
  }
}
