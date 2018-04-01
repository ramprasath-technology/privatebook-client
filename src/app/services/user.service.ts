import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Common } from '../models/common';
import { Signup } from '../models/signup';
import { Login } from '../models/login';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  createUser(signup: Signup){
    var url = `${Common.BASE_API_URL}api/users`;
    return this.http.post(url,signup);
  }

  loginUser(login: Login){
    var url = `${Common.BASE_API_URL}api/users/login`;
    return this.http.post(url,login);
  }

}
