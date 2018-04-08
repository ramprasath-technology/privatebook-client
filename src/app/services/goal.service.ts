import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Goal } from '../models/goal';
import { Common } from '../models/common';

@Injectable()
export class GoalService {

  constructor(private http: Http) { }

  submitGoal(goal: Goal){
    let url = Common.BASE_API_URL;
    let completeUrl = `${url}api/goals`;

    return this.http.post(completeUrl, goal);
  }

  getGoals(userId: number){
    let url = Common.BASE_API_URL;
    let completeUrl = `${url}api/goals/user/${userId}`;

    return this.http.get(completeUrl);
  }

  deleteGoal(goalId: number){
    let url = Common.BASE_API_URL;
    let completeUrl = `${url}api/goals/${goalId}`;

    return this.http.delete(completeUrl);
  }

}
