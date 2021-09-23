import { Component, OnInit } from '@angular/core';
import { UserService } from '../users-service';
import { User } from 'src/app/model/user';
import { LoginUser } from 'src/app/model/login-user';

@Component({
    selector: "get-all-users",
    templateUrl: 'get-all-users.component.html',
    styleUrls: ['./get-all-users.component.css']
})
export class GetAllUsersComponet implements OnInit {
    loggedInUser: LoginUser;
    users: User[] = [];
    successMessage: string = null;
    errorMessage: string = null;

    constructor(private userService: UserService) { }


    ngOnInit(): void {
        this.successMessage = null;
        this.errorMessage = null;
        this.loggedInUser = new LoginUser();
        this.loggedInUser = JSON.parse(sessionStorage.getItem("user"));
        this.userService.getAllUsers().subscribe(
            response => {
                this.users = response;
            }, error => {
                this.errorMessage = error;
            });
    }

    deleteUser(userToDelete: User) {
        this.successMessage = null;
        this.errorMessage = null;
        if (userToDelete.userName == this.loggedInUser.username) {
            this.errorMessage = "Can not delete the logged in user!!";
        } else {
            this.userService.deleteUser(userToDelete.id as number).subscribe(
                response => {
                    this.successMessage = response;
                    this.users = this.users.filter(user => user.id != userToDelete.id);
                }, error => {
                    this.errorMessage = error;
                }
            )
        }
    }


}