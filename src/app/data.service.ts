import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  

  currentUser
  isLoggedIn=false;
  //setting current user
  setCurrentUser(username) {
    this.currentUser=username
  }

  //getting current user
  getCurrentUser(){
    return this.currentUser;
  }
 
  //logout
  logout(){
    this.isLoggedIn=false;
    localStorage.removeItem("signedJwtToken");
  }
 
  
  
  

  constructor(private hc:HttpClient) { }

   //adding user
   addUser(userObj):Observable<string> {
    return this.hc.post<string>("/user/signup",userObj);
  }

  //getting users
  getUsers():Observable<object[]>{
    console.log("in getting users service")
    return this.hc.get<object[]>("/user/home");
      }
  //login
  doLogin(loginObj):Observable<any>{
   return this.hc.post<any>("/user/login",loginObj);
  }
}
