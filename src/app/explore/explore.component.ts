import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  constructor(private ds:DataService) { }
  users
  ngOnInit() {
  //     this.users=this.ds.getUsers();
  //     console.log(this.users);
  }

}
