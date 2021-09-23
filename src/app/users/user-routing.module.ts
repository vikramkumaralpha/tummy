import { UsersComponent } from './users.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { GetAllUsersComponet } from './get-all-users/get-all-users.component';
import { GetUserDetailsComponent } from './get-user-details/get-user-details.component';
import { AppRoutingGuard } from '../app.routing-guard';

const routes: Routes = [
    {
        path: 'users', component: UsersComponent, canActivate: [AppRoutingGuard], children: [
            { path: 'getAllUsers', component: GetAllUsersComponet },
            { path: 'getUserDetails/:userId', component: GetUserDetailsComponent }
        ]
    },
    { path: '', redirectTo: '/users', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }