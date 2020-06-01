import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {NgForm} from '@angular/forms';
import { BindingForm } from '@angular/compiler/src/compiler_util/expression_converter';
import { NgForOf } from '@angular/common';
import { Router } from '@angular/router';
import { UserappRoutingModule } from '../userapp/userapp-routing.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private ds:DataService,private router:Router) { }
 
  ngOnInit() {
    setTimeout(() => {
      this.ds.logout();
    }, 0);
  }
 
  onSubmit(f:NgForm){
     var loginObj=f.value;
     if(loginObj.role=="admin"){

     }
     else if(loginObj.role=="user"){
      this.ds.doLogin(loginObj).subscribe((res)=>{
        if(res["message"]=="invalid username"){
          alert("invalid username. please enter a valid username")
        }
        else if(res["message"]=="invalid password"){
          alert("invalid password. please try with another password")
        }
        else if(res["message"]=="success"){
          alert("login success")
          localStorage.setItem("signedJwtToken",res["token"]);
          this.ds.isLoggedIn=true;
          this.ds.setCurrentUser(res["username"])
         this.router.navigate(['../userapp/userdashboard',res["username"]]);
        }
      })

     }
      
  }
 

}
