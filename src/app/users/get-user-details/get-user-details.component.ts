import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../users-service';
import { User } from 'src/app/model/user';
import { Location } from '@angular/common';

@Component({
  selector: 'get-user-details',
  templateUrl: './get-user-details.component.html',
  styleUrls: ['./get-user-details.component.css']
})
export class GetUserDetailsComponent implements OnInit {
  userId: number;
  user: User;
  errorMessage: string = null;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private location: Location) { }

  ngOnInit() {
    this.errorMessage = null;
    this.activatedRoute.paramMap.subscribe(params => {
      this.userId = params.get('userId') as unknown as number;
    });
    this.userService.getUserDetails(this.userId).subscribe(
      response => {
        this.user = response;
      }, error => {
        this.errorMessage = error;
      }
    )
  }

  goBack() {
    this.location.back();

  }

}
