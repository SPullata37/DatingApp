import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { AccountService } from '../_services/account.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private accService: AccountService  ) {
  
  }
  registerModel : any ={} ;
  cancelRegistration = false;
  @Input() regUsersList :any =[] ;
  @Output() registerationCancel =  new EventEmitter(); 
  ngOnInit(): void {
  }

  RegisterUser(){
       console.log(this.registerModel)
       this.accService.userRegister(this.registerModel)
       .subscribe(
          res => {console.log(res)} ,
          err => {console.log(err)}
       )
  }

  cancel(){ 
    this.registerationCancel.emit(this.cancelRegistration);
  }

}
function input() {
  throw new Error('Function not implemented.');
}

