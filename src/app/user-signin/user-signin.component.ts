import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

import { ResetPassword } from '../models/reset-password';

@Component({
  selector: 'app-user-signin',
  templateUrl: './user-signin.component.html',
  styleUrls: ['./user-signin.component.css'],
  providers: [UserService]
})
export class UserSigninComponent implements OnInit {
  readonly errorMessage: string = "Oops! Your email and password do not match. Mind trying again?";
  readonly emailErrorMessage: string = "Hmmm, seems like we are unaware of this email. Wanna sign up as new user?";
  readonly securityErrorMessage: string = "Well, that's not quite right! Wanna try again?";
  showSecurityError: boolean = false;
  showErrorMessage: boolean = false;
  showEmailVerification: boolean = false;
  showPasswordReset: boolean = false;
  showLogin: boolean = true;
  showEmailVerificationError: boolean = false;
  userId: number;
  securityQuestion: string;
  heading: string = "Sign In";

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  loginUser(form: NgForm) {
    console.log('enter');
    this.userService.loginUser(form.value)
      .subscribe(
      (response) => {
        if (response.status === 200) {
          let data = response.json();
          if (data >= 0){
          sessionStorage.setItem('userId', data);
            this.router.navigate(['/featurelist', data]);
          }
          else
            this.showErrorMessage = true;
        } else {
          this.showErrorMessage = true;
        }
      },
      (error) => {
        this.showErrorMessage = true;
      }
      )
  }

  showReset() {
    this.showEmailVerification = true;
    this.showErrorMessage = false;
    this.showLogin = false;
    this.heading = "Verify Email";
  }

  resetPassword(resetForm: NgForm) {
    let password: ResetPassword = resetForm.value;
    password.userId = this.userId;
    this.userService.resetPassword(password)
      .subscribe((response) => {
        if (response.status === 200 || response.status === 304) {
          this.router.navigate(['/featurelist', this.userId]);
          
        } else {
          this.showSecurityError = true;
        }

      },
      (error) => {
        this.showSecurityError = true;
      });
  }

  verifyUser(form: NgForm) {
    this.showEmailVerificationError = false;
    let email = form.value.email;
    this.userService.getUserByEmail(email)
      .subscribe((response) => {
        console.log(response);
        if (response.status === 200 || response.status === 304) {
          let result = response.json();
          this.userId = result.userId;
          this.securityQuestion = result.securityQuestion;
          this.showEmailVerification = false;
          this.showPasswordReset = true;
          this.heading = "Reset Password";
        }
        else {
          this.showEmailVerificationError = true;
        }
      }, (error) => {

      });

  }

}
