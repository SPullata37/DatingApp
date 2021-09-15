import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_Model/UserEntity';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = "https://localhost:43429/api/";
  private currentSourceUser =  new ReplaySubject<User>(1);
  currentUser$  =  this.currentSourceUser.asObservable();
  constructor(private http: HttpClient) {

  }

  login(model: any) {
    return this.http.post("https://localhost:44352/api/Account/login", model).pipe(
      map((response: User) => {
        const usr = response;
        if (usr) {
          localStorage.setItem("User", JSON.stringify(usr));
          this.currentSourceUser.next(usr);
        }
      }
      ));
  }
   
  userRegister(model: any){
    return this.http.post("https://localhost:44352/api/Account", model).pipe(
      map((user : User) => { 
        if(user){
          localStorage.setItem("User", JSON.stringify(user));
          this.currentSourceUser.next(user);
        }
        debugger
        return user;
      })
    )
  }


  setCurrentUser(user : User){
     this.currentSourceUser.next(user)  ;
  } 


  getUser() {
   return this.http.get("https://localhost:44352/api/Users") ;
  } 

  logout() {
    localStorage.removeItem("User")
    this.currentSourceUser.next(null);
  }
}
