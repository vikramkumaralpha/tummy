import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginServcie } from './login-service';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/model/login-user';
import { TokenStorage } from 'src/app/token-storage/token-storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginUser: LoginUser;
  errorMessage: string = null;
  isTryingToLogin: boolean = false;

  constructor(private fb: FormBuilder, private loginService: LoginServcie,
    private tokenStorage: TokenStorage, private router: Router) { }

  ngOnInit() {
    this.loginUser = new LoginUser();
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      username: [this.loginUser.username, [Validators.required], null],
      password: [this.loginUser.password, [Validators.required], null]
    })
  }




  login() {
    this.isTryingToLogin = true;
    this.errorMessage = null;
    this.loginUser = this.loginForm.value as LoginUser;

    this.loginService.login(this.loginUser).subscribe(
      response => {
        sessionStorage.setItem("user", JSON.stringify(this.loginUser));
        this.tokenStorage.saveToken(response.token);
        this.isTryingToLogin = false;
        this.router.navigate(['/users']);

      }, error => {
        this.isTryingToLogin = false;
        this.errorMessage = error;
      }
    );


  }


}
