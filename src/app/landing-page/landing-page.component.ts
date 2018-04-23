//Importing necessary component for the landing page
import { Component, OnInit, ElementRef } from '@angular/core';
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

//Class definition
export class LandingPageComponent implements OnInit {

//Variable declaration
accountExists: boolean = false;

//Constructor initialization
  constructor(private userService: UserService, private router: Router, private featureService: FeatureServiceService, private elementRef: ElementRef) { }
  
  //Display or hide sign in page based on user input
  showSignIn(){
    this.accountExists = true;
  }

  //Display or hide sign in form based on user input
  showSigninForm(accountExists){
    this.accountExists = accountExists;
  }

  //Display or hide sign up page based on user input
  showSignUp(){
    this.accountExists = false;
  }

  ngOnInit(){
    
  }

   //Initializing color settings for the page
   ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.minHeight = "100vh";
    this.elementRef.nativeElement.ownerDocument.body.style.background = "linear-gradient(#fff,#ccf5ff)";
  }

}
