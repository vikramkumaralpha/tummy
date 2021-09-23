import { Component, OnInit } from '@angular/core';
import { LoginUser } from '../model/login-user';
import { Router } from '@angular/router';
import { TokenStorage } from '../token-storage/token-storage';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  loggedInUser: LoginUser;

  constructor(private router: Router, private tokenStorage: TokenStorage) { }

  ngOnInit() {
    this.loggedInUser = new LoginUser();
    this.loggedInUser = JSON.parse(sessionStorage.getItem("user"));
  }


  // getAllUsers() {
  //   this.router.navigate(["getAllUsers"]);
  // }


}
