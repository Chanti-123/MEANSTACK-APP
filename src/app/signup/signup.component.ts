import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { NgForm } from '@angular/forms';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Router } from '@angular/router';
import { constants } from 'os';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private ds:DataService,private router:Router) { }

  file:File;
  fileName:string
  imageUrl:string|ArrayBuffer
  pre=false
  //method to view preview of the profile
  onchange(file:File){
    if(file){
      this.file=file;
      this.fileName=file.name;

      //FileReader Object lets webapplication read the contents of file asynchronously stored in users computer
      //using File Or Blob objects to specify the file to read

      const reader=new FileReader();

      //readAsDataUrl is used to read the contents of specified file

      reader.readAsDataURL(file);

      //a handler for the load event. this event will be triggered each time the loading operation is completed successfuly;
      //The FileReader.onload property contains an event handler executed when the load event is fired

      reader.onload=()=>{
        this.imageUrl=reader.result;
        this.pre=true;
      }
    }
  }

  onSubmit(f:NgForm){

    //form data object preparation
    let formData=new FormData();
    let userObj=f.value;
    //append image to it
    formData.append("photo",this.file);
    formData.append("userObj",JSON.stringify(userObj));

    //pass "formData" object to register service to make HTTP POST request 
    
    this.ds.addUser(formData).subscribe((res)=>{


       
      if(res["message"]=="registration successful"){
        alert("user registration successful")
        this.router.navigate(['/login']);
      }
      else if(res["message"]=="username already taken"){
        alert("user name already taken please try with other username");
      }
      f.reset();
      this.pre=false;
    });
  }
  ngOnInit() {
    
  }
  

}
