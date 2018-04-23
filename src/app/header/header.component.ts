//Importing components required for header page
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [UserService]
})

//Creating class for header component
export class HeaderComponent implements OnInit {
  greetingMessage: string;
  userId: number;
  userName: string;
  firstName: string;
  timeOfDay: string;

  //Constructor initialization
  constructor(private userService: UserService, private router: Router) { }

  //Get user information
  getUser() {
    this.userService.getUserById(this.userId)
      .subscribe((response) => {
        let user = response.json();
        this.userName = user.name;
        this.setUserGreeting();
      },
      (error) => {
        alert('Error in getting user information');
      });
  }

  //Set user greeting
  setUserGreeting() {
    this.firstName = this.userName.split(' ')[0];
    let date = new Date();
    let time = date.getHours();
    if (time < 12)
      this.timeOfDay = "Good morning,";
    else if (time >= 12 && time < 16)
      this.timeOfDay = "Good afternoon,";
    else
      this.timeOfDay = "Good evening,";

    this.greetingMessage = `${this.timeOfDay} ${this.firstName}!`;

  }

  //Redirecting to feature list
  redirect() {
    this.router.navigate([`/featurelist`, this.userId]);
  }

  //Log out functionality
  logout() {
    sessionStorage.clear();
    this.router.navigate([`/landing`]);
  }

  //Initializing page
  ngOnInit() {
    this.userId = +sessionStorage.getItem('userId');
    this.getUser();
  }

}
