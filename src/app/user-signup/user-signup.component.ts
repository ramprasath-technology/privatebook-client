//Importing components requird for user signup page
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';
import { FeatureServiceService } from '../services/feature-service.service';

@Component({
  selector: 'app-user-signup',
  providers: [UserService, FeatureServiceService],
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})

//Creating class for user signup
export class UserSignupComponent implements OnInit {
  errorMessage: string = "Seems like you are already registered. Mind logging in?";
  showErrorMessage: boolean = false;
  constructor(private userService: UserService, private featureService: FeatureServiceService, private router: Router) { }

  //Create new user
  submitUser(form: NgForm) {
    this.userService.createUser(form.value)
      .subscribe(
      (response) => {
        if (response.status === 200 || response.status === 201) {

          let data = response.json();
          if (data !== "Already exists") {
            this.featureService.createFeaturesForUser(data.userId)
              .subscribe(
              (response) => {
                if (response.status === 200) {      
                  if (data != null) {
                    sessionStorage.setItem('userId', data.userId);
                    this.router.navigate(['/featurelist', data.userId]);
                  } else {
                    this.showErrorMessage = true;
                  }
                } else {
                  this.showErrorMessage = true;
                }

              },
              (error) => {
                this.showErrorMessage = true;
              }
              );
          }else{
            this.showErrorMessage = true;
          }
        }
      },
      (error) => { }
      );
  }

  ngOnInit() {
  }

}
