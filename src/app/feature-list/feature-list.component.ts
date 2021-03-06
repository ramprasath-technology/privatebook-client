//Importing the components necessary for feature list
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
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.css'],
  providers: [FeatureServiceService, CommonService, GoalService, EventService, StockService, DiaryService, WeatherService]
})

//Creating class for feature list
export class FeatureListComponent implements OnInit {
  //Variable declaration
  private sub: any;
  private userId: number;
  lastEntry: string = "";
  goals: Goal[] = [];
  events: Event[] = [];
  features: Features[] = [];
  stocks: Stock[] = [];
  entriesToShow: string[] = [];
  entries: Diary[] = [];
  showEvents: boolean = false;
  showGoals: boolean = false;
  showStocks: boolean = false;
  showWeather: boolean = false;
  showDiary: boolean = false;
  showFiles: boolean = false;
  lat: number;
  lon: number;
  weatherMessage: string;

  //Constructor initialization
  constructor(private elementRef: ElementRef, private route: ActivatedRoute, private featureService: FeatureServiceService, private commonService: CommonService, private router: Router, private goalService: GoalService, private eventService: EventService, private stockService: StockService, private diaryService: DiaryService, private weatherService: WeatherService) { }

  //Getting current location of user
  getLocationDetails() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;
        console.log(this.lat, this.lon);
        this.getWeatherDetails();
      });
    }
  }

  //Getting weather details for current location
  getWeatherDetails() {
    this.weatherService.getWeatherDetails(this.lat, this.lon)
      .subscribe((response) => {
        let weather = response.json();
        this.weatherMessage = `It's ${weather.temperature} degrees right now with ${weather.description}`;
      }, (error) => {
        console.log(error);
      });
  }

  //Getting all the features for the user
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

  //Add a new feature
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

  //Remove a feature
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

  //Find feature that has been modified by user
  findFeatureToModify(featureName: string): Features[] {
    console.log(this.features);
    let featureToModify: Features[] = this.features.filter((featureObj) => {
      return featureObj.feature.shortName === featureName;
    });
    return featureToModify;
  }

  //Set settings for displaying features
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
        default:
          break;
      }
    });
  }

  //Determine action to be taken based on user input
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
      default:
        break;
    }
  }

  //Refresh screen
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
      default:
        break;
    }
  }

  //Get goals for user
  getGoals() {
    this.goalService.getGoals(this.userId)
      .subscribe((response) => {
        let goals: Goal[] = response.json();
        this.goals = goals.splice(0, 3);
      },
      (error) => {

      });
  }

  //Get events for user
  getEvents() {
    this.eventService.getEvents(this.userId)
      .subscribe((response) => {
        let events = response.json();
        this.events = events.splice(0, 3);
      },
      (error) => {

      });
  }

  //Get stocks for user
  getStockEntries() {
    this.stockService.getStockForUser(this.userId)
      .subscribe((response) => {
        let stocks = response.json();
        this.stocks = stocks.splice(0, 3);
      }, (error) => {

      });
  }

  //Get diary entries for user
  getDiaryEntries() {
    this.diaryService.getDiaryEntriesByUser(this.userId)
      .subscribe((response) => {
        this.entries = response.json();
        let index = 0;
        if (this.entries.length > 0){
        this.entries.forEach( (entry) => {
          if(index > 2){
            
          }
            else{
              this.entriesToShow.push(entry.entry.substring(3, 10) + "...");
              index++;
            }
        });

        }
      });
  }

  //Redirect to particular feature's page
  redirect(feature) {
    this.router.navigate([`/${feature}`, this.userId]);
  }

  //Initialize user id on page load
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.userId = +params['userId'];
      this.getFeaturesForUser();
      this.getLocationDetails();
    });
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.minHeight = "100vh";
    this.elementRef.nativeElement.ownerDocument.body.style.background = "linear-gradient(#fff,#ccf5ff)";
  }

}


