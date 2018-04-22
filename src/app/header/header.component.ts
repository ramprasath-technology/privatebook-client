import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [UserService]
})
export class HeaderComponent implements OnInit {
greetingMessage: string;
userId: number;
userName: string;
firstName: string;
timeOfDay: string;

  constructor(private userService: UserService, private router: Router) { }

  getUser(){
    this.userService.getUserById(this.userId)
      .subscribe( (response) => {
        let user = response.json();
        this.userName = user.name;
        this.setUserGreeting();
      },
      (error) => {
        alert('Error in getting user information');
      });
  }

  setUserGreeting(){
    this.firstName = this.userName.split(' ')[0];
    let date = new Date();
    let time = date.getHours();
    if(time < 12)
      this.timeOfDay = "Good morning,";
    else if(time >= 12 && time < 16)
      this.timeOfDay = "Good afternoon,";
    else  
      this.timeOfDay = "Good evening,";  

    this.greetingMessage = `${this.timeOfDay} ${this.firstName}!`;  

  }

  redirect(){
    this.router.navigate([`/featurelist`, this.userId]);
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate([`/landing`]);
  }

  ngOnInit() {
    this.userId = +sessionStorage.getItem('userId');
    this.getUser();
  }

}
