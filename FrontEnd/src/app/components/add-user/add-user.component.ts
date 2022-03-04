import { Component, OnInit, ViewChild} from '@angular/core';
import { UsersService } from 'src/app/services/users-service.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  valbutton: string = "Save";

  constructor(private UserService: UsersService) { }

  createUser(user:any, isValid?:boolean){
    user.mode=this.valbutton;
    this.UserService.createUser(user).subscribe((data: any) =>{
      alert(data.data)
      this.ngOnInit();
    })
  }
  ngOnInit(): void {
  }

}
