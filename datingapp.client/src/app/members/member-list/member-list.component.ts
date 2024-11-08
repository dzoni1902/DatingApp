import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { PaginatedResult, Pagination } from '../../_models/pagination';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[] = [];
  pagination: Pagination  = { currentPage: 1, itemsPerPage: 5, totalItems: 0, totalPages: 1 };

  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {    //now we get the data before activating the route itself
    this.route.data.subscribe(data => {
      const paginatedResult: PaginatedResult<User[]> = data['users'];
      this.users = paginatedResult.result ?? [];
      this.pagination = paginatedResult.pagination ?? this.pagination;
    });
  } 

  pageChanged(event: PageChangedEvent): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  loadUsers() {               
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe(
        (res: PaginatedResult<User[]>) => {
          this.users = res.result ?? [];
          this.pagination = res.pagination ?? { currentPage: 1, itemsPerPage: 5, totalItems: 0, totalPages: 1 };
    }, error => {
      this.alertify.error(error);
    });
  }

}
