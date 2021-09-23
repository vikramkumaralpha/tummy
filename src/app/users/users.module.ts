import { NgModule } from '@angular/core';
import { GetAllUsersComponet } from './get-all-users/get-all-users.component';
import { UserService } from './users-service';
import { UserRoutingModule } from './user-routing.module';
import { CommonModule } from '@angular/common';
import { GetUserDetailsComponent } from './get-user-details/get-user-details.component';


@NgModule({
    declarations: [GetAllUsersComponet, GetUserDetailsComponent],
    providers: [UserService],
    imports: [CommonModule, UserRoutingModule]
})
export class UsersModule {

}