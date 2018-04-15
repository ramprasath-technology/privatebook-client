import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-signin',
  templateUrl: './user-signin.component.html',
  styleUrls: ['./user-signin.component.css'],
  providers: [UserService]
})
export class UserSigninComponent implements OnInit {
 readonly errorMessage: string = "Oops! Your email and password do not match. Mind trying again after?";
 showErrorMessage: boolean = false;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  loginUser(form: NgForm){
    this.userService.loginUser(form.value)
      .subscribe(
        (response) => {
          if(response.status === 200){
            let data = response.json();
            if(data >= 0)
              this.router.navigate(['/featurelist',data]);
          }else{
              this.showErrorMessage = true;
          }
        },
        (error) => {

        }
      )
  }

}
