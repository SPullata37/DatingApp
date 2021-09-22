import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(public accountService: AccountService ,
        private route : Router ,
        private toastr: ToastrService  ) { }

  ngOnInit(): void { 

   
  }


  login() 
  {
    this.accountService.login(this.model)
      .subscribe
      (
        res => { 
          this.route.navigate(["/members"]); 
          this.accountService.currentUser$.subscribe(res =>{ console.log(res.userName
            )});          
          },
        err => { this.toastr.error(err.error); }
        );

  }

  logout() {
    this.accountService.logout();
    this.route.navigate(["/"]);      
  }


}
