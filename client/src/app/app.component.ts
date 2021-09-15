import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_Model/UserEntity';
import { AccountService } from './_services/account.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  /**
   *
   */
  constructor(private _http: HttpClient, private accountService: AccountService) {


  }
  title = 'client';

  public result: any;
  ngOnInit(): void {
    this.getUser();
    this.setCurrentUser();
  }

  getUser(): void {
    this._http.get("https://localhost:44352/api/Users")
      .subscribe(
        res => { this.result = res; },
        err => { console.log(err) }
      )
  } 

  setCurrentUser(){
    const user :  User =  JSON.parse(localStorage.getItem("user"));
    this.accountService.setCurrentUser(user);
  }
}
