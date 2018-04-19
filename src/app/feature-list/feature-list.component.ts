import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Common } from '../models/common';
import { Goal } from '../models/goal';
import { Event } from '../models/event';
import { Features } from '../models/features';
import { Stock } from '../models/stock';
import { Diary } from '../models/diary';

import { FeatureServiceService } from '../services/feature-service.service';
import { CommonService } from '../services/common.service';
import { GoalService } from '../services/goal.service'
import { EventService } from '../services/event.service';
import { StockService } from '../services/stock.service';
import { DiaryService } from '../services/diary.service';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.css'],
  providers: [FeatureServiceService, CommonService, GoalService, EventService, StockService, DiaryService]
})
export class FeatureListComponent implements OnInit {
  private sub: any;
  private userId: number;
  lastEntry: string = "";

  goals: Goal[] = [];
  events: Event[] = [];
  features: Features[] = [];
  stocks: Stock[] = [];

  showEvents: boolean = false;
  showGoals: boolean = false;
  showStocks: boolean = false;
  showWeather: boolean = false;
  showDiary: boolean = false;
  showFiles: boolean = false;


  constructor(private elementRef: ElementRef, private route: ActivatedRoute, private featureService: FeatureServiceService, private commonService: CommonService, private router: Router, private goalService: GoalService, private eventService: EventService, private stockService: StockService, private diaryService: DiaryService) { }

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
    console.log(this.features);
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
          this.getStockEntries();
          break;
        case "DIA":
          this.showDiary = true;
          this.getDiaryEntries();
          break;
       // case "WEA":
         // this.showWeather = true;
          //this.getEvents();
          //break;
        //case "FIL":
          //this.showFiles = true;
          //this.getEvents();
          //break;
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
          this.addFeature(featureName);
        else
          this.removeFeature(featureName);
        break;
      case "STO":
        if (this.showStocks)
          this.addFeature(featureName);
        else
          this.removeFeature(featureName);
        break;
      case "DIA":
        if (this.showDiary)
          this.addFeature(featureName);
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
      case "STO":
        if (this.showStocks)
          this.getStockEntries();
        break;
      case "DIA":
        if (this.showDiary)
          this.getDiaryEntries();
        break;
      /*case "STO":
        this.showStocks = param;
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

  getStockEntries() {
    this.stockService.getStockForUser(this.userId)
      .subscribe((response) => {
        let stocks = response.json();
        this.stocks = stocks.splice(0, 3);
      }, (error) => {

      });
  }

  getDiaryEntries() {
    this.diaryService.getDiaryEntriesByUser(this.userId)
      .subscribe((response) => {
        let entries: Diary[] = response.json();
        if (entries.length > 0)
          this.lastEntry = entries[0].entry.substring(3, 10) + "...";
          console.log(this.lastEntry);
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

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.minHeight = "100vh";
    this.elementRef.nativeElement.ownerDocument.body.style.background = "linear-gradient(#008fb3, #ccf5ff)";
  }

}


