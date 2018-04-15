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
