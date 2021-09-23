import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TokenStorage } from 'src/app/token-storage/token-storage';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user';
import { PasswordMatchValidators } from 'src/app/validators/password-match.validators';
import { RegisterService } from './register.service';
import { timer, interval } from 'rxjs';
import { take, finalize, map } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;
  registerForm: FormGroup;
  errorMessage: string = null;
  isTryingToRegister: boolean = false;
  successMessage: string = null;
  countDown: any = null;
  usernameAvailable: boolean = true;
  userChecked: boolean = false;

  constructor(private fb: FormBuilder, private registerService: RegisterService,
    private tokenStorage: TokenStorage, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.user = new User();
    this.createregisterForm();
  }

  createregisterForm() {
    this.registerForm = this.fb.group({
      userName: [this.user.userName, [Validators.required], null],
      password: [this.user.password, [Validators.required], null],
      confirmPassword: [null, [Validators.required], null],
      salary: [this.user.password, [Validators.required], null],
      age: [this.user.password, [Validators.required], null]
    }, { validators: PasswordMatchValidators })
  }

  checkUserNameAvailability() {
    let userNameEntered = this.registerForm.controls.userName.value;
    this.registerService.checkUsernameAvailability(userNameEntered).subscribe(
      response => {
        this.userChecked=true;
        this.usernameAvailable = response
      },
      error => {
        this.errorMessage = error;
        this.userChecked = false;
        this.usernameAvailable = true;
      }
    );
  }

  seconds: number = 5;
  register() {
    this.isTryingToRegister = true;
    this.errorMessage = null;
    this.successMessage = null;
    this.user = this.registerForm.value as User;
    this.registerService.register(this.user).subscribe(
      response => {

        let tempSuccessMessage = response + " . Redirecting you to login page in";
        let initial = 5;
        let expiration = interval(1000).pipe(take(5));
        this.countDown = expiration.subscribe(seconds => {
          this.isTryingToRegister = false;
          this.countDown = initial - seconds;
          this.successMessage = tempSuccessMessage + " " + this.countDown + " seconds!!";
        });

        setTimeout(() => {
          this.router.navigate(["login"], { relativeTo: this.activatedRoute.parent });
        }, 6000)
      },
      error => {
        this.errorMessage = error
      })

  }

}
