import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Common } from '../models/common';

import { FeatureServiceService } from '../services/feature-service.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.css'],
  providers: [FeatureServiceService, CommonService]
})
export class FeatureListComponent implements OnInit {
  private sub: any;
  private userId: number;

  constructor(private route: ActivatedRoute, private featureService : FeatureServiceService, private commonService: CommonService) { }

  getFeaturesForUser(){
    this.featureService.getFeaturesForUser(this.userId)
      .subscribe(
        (response) => {
          let data = response.json();
          console.log('features are:');
          console.log(data);
        },
        (error) => {

        }
      )
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.userId = +params['userId'];
       this.setUserId();
       this.getFeaturesForUser();
       
  });
}

setUserId(){
  this.commonService.setUser(this.userId);
    //this.commonService.changeMessage(this.userId);
  }

}


