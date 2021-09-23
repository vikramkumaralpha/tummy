import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from './logout/logout.component';
import { RegisterService } from './register/register.service';

@NgModule({
    declarations: [LogoutComponent],
    imports: [
        HomeRoutingModule,
        CommonModule
    ],
    providers: [RegisterService],
    exports: []
})
export class HomeModule {

}