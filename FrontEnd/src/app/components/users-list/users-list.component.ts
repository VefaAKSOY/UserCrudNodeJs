import { Component, OnInit } from '@angular/core';

import { ActivatedRoute} from '@angular/router';

import { ColDef} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
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
  filters: any;
  columnDefs :ColDef[]=  [
    {headerName:"#",field:"userid", sortable:true, filter:true, checkboxSelection:true },
    {headerName:"NAME",field:"name", sortable:true, filter:true },
    {headerName:"SURNAME",field:"surname", sortable:true, filter:true },
    {headerName:"E-MAIL",field:"email", sortable:true, filter:true },
    {headerName:"PHONE NUMBER",field:"phoneno", sortable:true, filter:true },
    {headerName:"COMPANY",field:"companyname", sortable:true, filter:true },
    {headerName:"DESCRİPTION",field:"description", sortable:true, filter:true },
    
  ];
  rowData:any
  constructor(private UsersService: UsersService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => this.filters = params)

    this.getAllUsers(this.filters)
  }
  getAllUsers(filters:any){
    this.route.queryParams.subscribe(params => this.filters = params)
    this.UsersService.getAll(filters).subscribe((data: any)=>{
      this.rowData = data;
    })
  }
  ngOnInit(): void {
     
  }

}
