import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Common } from '../models/common';
import { Goal } from '../models/goal';
import { Event } from '../models/event';
import { Features } from '../models/features';

import { FeatureServiceService } from '../services/feature-service.service';
import { CommonService } from '../services/common.service';
import { GoalService } from '../services/goal.service'
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.css'],
  providers: [FeatureServiceService, CommonService, GoalService, EventService]
})
export class FeatureListComponent implements OnInit {
  private sub: any;
  private userId: number;
  private goals: Goal[] = [];
  private events: Event[] = [];
  private features: Features[] = [];
  showEvents: boolean = false;
  showGoals: boolean = false;
  showStocks: boolean = false;
  showWeather: boolean = false;
  showDiary: boolean = false;
  showFiles: boolean = false;


  constructor(private route: ActivatedRoute, private featureService: FeatureServiceService, private commonService: CommonService, private router: Router, private goalService: GoalService, private eventService: EventService) { }

  getFeaturesForUser() {
    this.featureService.getFeaturesForUser(this.userId)
      .subscribe(
      (response) => {
        this.features = response.json();
        console.log(this.features);
        this.setFeatureSettings();

      },
      (error) => {
      }
      )
  }

  addFeature(featureName: string) {
    let feature = this.findFeatureToModify(featureName)[0];
    let mappingObj = { "userId": this.userId, "featureId": feature.featureId };
    this.featureService.addFeature(mappingObj)
      .subscribe((response) => {
        if (response.status === 200) {
          this.refreshDisplay(featureName);
        }
      }, (error) => {

      });
  }

  removeFeature(featureName: string) {
    let feature = this.findFeatureToModify(featureName)[0];
    let mappingObj = { "userId": this.userId, "featureId": feature.featureId };
    this.featureService.removeFeature(mappingObj)
      .subscribe((response) => {
        if (response.status === 200) {
          this.refreshDisplay(featureName);
        }
      }, (error) => {

      });
  }

  findFeatureToModify(featureName: string): Features[] {
    let featureToModify: Features[] = this.features.filter((featureObj) => {
      return featureObj.feature.shortName === featureName;
    });
    return featureToModify;
  }

  setFeatureSettings() {
    this.features.forEach((featureObj) => {
      switch (featureObj.feature.shortName) {
        case "GOA":
          this.showGoals = true;
          this.getGoals();
          break;
        case "EVE":
          this.showEvents = true;
          this.getEvents();
          break;
        case "STO":
          this.showStocks = true;
          //this.getEvents();
          break;
        case "DIA":
          this.showDiary = true;
          //this.getEvents();
          break;
        case "WEA":
          this.showWeather = true;
          //this.getEvents();
          break;
        case "FIL":
          this.showFiles = true;
          //this.getEvents();
          break;
        default:
          break;
      }
    });
  }

  determineAction(featureName: string) {
    switch (featureName) {
      case "GOA":
        if (this.showGoals)
          this.addFeature(featureName);
        else
          this.removeFeature(featureName);
        break;
      case "EVE":
        if (this.showEvents)
          this.getEvents();
        else
          this.removeFeature(featureName);
        break;
      /*case "STO":
        this.showStocks = param;
        break;
      case "DIA":
        this.showDiary = param;
        break;
      case "WEA":
        this.showWeather = param;
        break;
      case "FIL":
        this.showFiles = param;
        //this.getEvents();
        break;*/
      default:
        break;
    }
  }

  refreshDisplay(featureName: string) {
    switch (featureName) {
      case "GOA":
        if (this.showGoals)
          this.getGoals();
        break;
      case "EVE":
        if (this.showEvents)
          this.getEvents();
        break;
      /*case "STO":
        this.showStocks = param;
        break;
      case "DIA":
        this.showDiary = param;
        break;
      case "WEA":
        this.showWeather = param;
        break;
      case "FIL":
        this.showFiles = param;
        //this.getEvents();
        break;*/
      default:
        break;
    }
  }

  getGoals() {
    this.goalService.getGoals(this.userId)
      .subscribe((response) => {
        let goals: Goal[] = response.json();
        this.goals = goals.splice(0, 2);
      },
      (error) => {

      });
  }



  getEvents() {
    this.eventService.getEvents(this.userId)
      .subscribe((response) => {
        let events = response.json();
        this.events = events.splice(0, 2);
      },
      (error) => {

      });
  }

  redirect(feature) {
    this.router.navigate([`/${feature}`, this.userId]);
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.userId = +params['userId'];
      this.getFeaturesForUser();

    });
  }

}


