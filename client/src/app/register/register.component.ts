import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  constructor(private accService: AccountService , private toastr : ToastrService ) {
  
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
          err => {  err => { this.toastr.error(err.error); }}
       )
  }

  cancel(){ 
    this.registerationCancel.emit(this.cancelRegistration);
  }

}
function input() {
  throw new Error('Function not implemented.');
}

