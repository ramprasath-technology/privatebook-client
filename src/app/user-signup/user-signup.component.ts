import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {
@ViewChild("signupForm") signup : ElementRef;
  constructor() { }

  submitUser(){
    console.log('form values');
    console.log(this.signup);
  }

  ngOnInit() {
  }

}
