import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../_models/user';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})

//this will be child component of MemberListComponent
export class MemberCardComponent implements OnInit {
  @Input() user?: User;

  constructor() { }

  ngOnInit() {
  }

}
