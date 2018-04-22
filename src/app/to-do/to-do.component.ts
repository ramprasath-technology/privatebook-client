import { Component, OnInit, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Goal } from '../models/goal';
import { GoalService } from '../services/goal.service';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css'],
  providers: [GoalService]
})

export class ToDoComponent implements OnInit {
  goals: Goal[] = [];
  goalsToDisplay: Goal[] = [];
  isModalOpen: boolean = false;
  private sub: any;
  private userId: number;
  successMessage = "Whoa, we are tracking your goal";
  errorMessage = "There has been an error in saving your goal";
  congratsMessage = "Superb! Congrats on completing one more goal!";
  showSuccess: boolean = false;
  showError: boolean = false;
  goalNumber: number = 0;
  totalLength: number = 0;
  pages: number[] = [];
  page: number = 1;
  progressValue = 0;
  displayPage: boolean = false;
  showCongrats: boolean = false;


  constructor(private goalService: GoalService, private route: ActivatedRoute, private spinnerService: Ng4LoadingSpinnerService, private elementRef: ElementRef) {
  }

  showSuccessMessage() {
    this.showSuccess = true;
    this.showError = false;
  }

  showErrorMessage() {
    this.showError = true;
    this.showSuccess = false;
  }

  resetMessages() {
    this.showError = false;
    this.showSuccess = false;
  }

  assignGoalDefaults(goal: Goal): Goal {
    goal.isCompleted = false;
    goal.createdDate = new Date();
    goal.userId = this.userId;
    return goal;
  }


  saveGoal(form: NgForm) {
    this.showCongrats = false;
    let newGoal: Goal = form.value;
    newGoal = this.assignGoalDefaults(newGoal);

    this.goalService.submitGoal(newGoal)
      .subscribe(
      (response) => {
        this.showSuccessMessage();
        form.resetForm();
        this.getGoals();
      },
      (error) => {
        this.showErrorMessage();
      }
      );
  }

  getGoals() {
    
    this.goalService.getGoals(this.userId)
      .subscribe(
      (response) => {
        this.formatGoals(response.json());
        this.spinnerService.hide();
      },
      (error) => {
        this.spinnerService.hide();
      }
      );
  }

  formatGoals(goals: Goal[]) {
    this.assignProgress(80);
    this.goals = [];
    goals.map((goal, index) => {
      goal["goalNumber"] = ++index;
      this.goals.push(goal);
    });

    this.totalLength = this.goals.length;

    this.changePage(1);
  }

  deleteGoal(goalId: number) {
    this.goalService.deleteGoal(goalId)
      .subscribe(
      (response) => {
        this.getGoals();
        this.showCongrats = true;
      },
      (error) => {

      }
      );
  }

  closeModal() {
    this.resetMessages();
  }

  assignProgress(number: number) {
    this.progressValue = number;
  }

  changePage(pageNumber) {
    let start = pageNumber * 10 - 9 - 1;
    let end = pageNumber * 10;
    this.goalsToDisplay = this.goals.slice(start, end);
  }

  ngOnInit() {
    this.spinnerService.show();
    this.sub = this.route.params.subscribe(params => {
      this.userId = +params['userId'];
      this.getGoals();
    });
  }

   ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.minHeight = "100vh";
    this.elementRef.nativeElement.ownerDocument.body.style.background = "linear-gradient(#fff,#ccf5ff)";
  }

}
