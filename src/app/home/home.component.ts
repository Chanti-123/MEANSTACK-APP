import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users:object=[]
  constructor(private ds:DataService) { }
  currentUser

  ngOnInit() {
    //getting current user from service
    this.currentUser=this.ds.getCurrentUser();
  this.ds.getUsers().subscribe((res)=>{
    //alert(res["users"])
    if(res["message"]=="Unauthorized access"){
      alert("Unauthorized access... login to accesss");
    }
    else if(res["message"]=="session has expired"){
      alert("session has expired... please relogin to continue")
    }
    else{
    this.users=res["users"];
    }
  })
  
  }
  

}
