import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private accService:AccountService ) { }

  registerMode : boolean = false;
  regisrerUsers: any = [] ; 
  ngOnInit(): void {
    this.getUsers();
  }
   
  userRegister(){
   this.registerMode =  !this.registerMode;
  }
   
  getUsers(){
     this.accService.getUser()
      .subscribe(
         res =>{ this.regisrerUsers = res },
         err=>{ console.log(err)}
         )
  }
   
  registerCancel(event : boolean){
    this.registerMode = event ;
  }
}
