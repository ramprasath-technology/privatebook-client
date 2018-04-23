import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Common } from '../models/common';
import { Signup } from '../models/signup';
import { Login } from '../models/login';
import { ResetPassword } from '../models/reset-password';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  //Create new user
  createUser(signup: Signup){
    var url = `${Common.BASE_API_URL}api/users`;
    return this.http.post(url,signup);
  }

  //Log in user
  loginUser(login: Login){
    var url = `${Common.BASE_API_URL}api/users/login`;
    return this.http.post(url,login);
  }

  //Reset password
  resetPassword(password: ResetPassword){
    var url = `${Common.BASE_API_URL}api/users/PasswordReset`;
    return this.http.post(url, password);
  }

  //Get user by email
  getUserByEmail(email: string){
    var url = `${Common.BASE_API_URL}api/users/EmailVerification/${email}`;
    return this.http.get(url);
  }

  //Get user by user id
  getUserById(id: number){
    var url = `${Common.BASE_API_URL}api/users/${id}`;
    return this.http.get(url);
  }

}
