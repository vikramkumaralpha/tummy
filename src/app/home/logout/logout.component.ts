import { Component, OnInit } from '@angular/core';
import { TokenStorage } from 'src/app/token-storage/token-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {


  constructor(private tokenStorage: TokenStorage,
    private router: Router) { }

  ngOnInit() {
    this.logout();

  }
  logout() {
    this.tokenStorage.logOut();
    this.router.navigate(["/"]);
  }
}
