import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {

  constructor(private ds:DataService,private hc:HttpClient) { }

  
  imageUrl
  userObj
  
  ngOnInit() {
    this.hc.get(`/user/profile/${this.username}`).subscribe((res)=>{
       this.imageUrl=res["data"].imageUrl;
       this.userObj=res["data"];
    })
    console.log(this.userObj)
  }
  
  username=this.ds.getCurrentUser();

}
