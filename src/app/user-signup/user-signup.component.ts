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
export class UserSignupComponent implements OnInit {
errorMessage: string = "Seems like you are already registered. Mind logging in?";
showErrorMessage: boolean = false;
  constructor(private userService: UserService, private featureService : FeatureServiceService, private router: Router) { }

submitUser(form : NgForm){
    this.userService.createUser(form.value)
      .subscribe(
        (response) => { 
          if(response.status === 200 || response.status === 201){
            console.log(response);
            let data = response.json();
            this.featureService.createFeaturesForUser(data.userId)
              .subscribe(
                (response) => {
                  if(response.status === 200){
                    if(data != null){
                    sessionStorage.setItem('userId', data.userId);
                    this.router.navigate(['/featurelist',data.userId]);
                    }else{
                      this.showErrorMessage = true;
                    }
                  }else{
                    this.showErrorMessage = true;
                  }

                },
                (error) => {
                  this.showErrorMessage = true;
                }
              );          
          }
        },
        (error) => {}
      );
  }

  ngOnInit() {
  }

}
