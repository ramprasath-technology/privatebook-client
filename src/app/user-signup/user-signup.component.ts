import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-signup',
  providers: [UserService],
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {

  constructor(private userService: UserService) { }

  submitUser(form : NgForm){
    this.userService.createUser(form.value)
      .subscribe(
        (response) => { console.log(response)},
        (error) => {}
      );
  }

  ngOnInit() {
  }

}
