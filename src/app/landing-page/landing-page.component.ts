import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';
import { FeatureServiceService } from '../services/feature-service.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  providers: [UserService, FeatureServiceService]
})
export class LandingPageComponent implements OnInit {

accountExists: boolean = false;
  constructor(private userService: UserService, private router: Router, private featureService: FeatureServiceService) { }

  submitUser(form : NgForm){
    this.userService.createUser(form.value)
      .subscribe(
        (response) => { 
          if(response.status === 200 || response.status === 201){
            let data = response.json();
            this.featureService.createFeaturesForUser(data.userId)
              .subscribe(
                (response) => {
                  if(response.status === 200){
                    this.router.navigate(['/featurelist',data.userId]);
                  }
                },
                (error) => {

                }
              );          
          }
        },
        (error) => {}
      );
  }

  loginUser(form: NgForm){
    this.userService.loginUser(form.value)
      .subscribe(
        (response) => {
          if(response.status === 200){
            let data = response.json();
            if(data >= 0)
              this.router.navigate(['/featurelist',data]);
          }
        },
        (error) => {

        }
      )
  }

  showSignIn(){
    this.accountExists = true;
  }

  showSigninForm(accountExists){
    this.accountExists = accountExists;
  }

  showSignUp(){
    this.accountExists = false;
  }

  ngOnInit() {
  }

}
