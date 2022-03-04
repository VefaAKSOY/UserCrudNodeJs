import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user.model';
import { UsersService } from '../../services/users-service.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phoneNo', 'Edit', 'Delete'];
  User: User = new User();
  id : number = 1;
  Repdata: any;

  constructor(private UsersService: UsersService) {
    this.UsersService.getAll().subscribe((data: any)=>{
      this.Repdata = data;
      console.log("get data => ", data);
    })
  }

  ngOnInit(): void {
  }

}
