import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FeatureServiceService } from '../services/feature-service.service';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.css'],
  providers: [FeatureServiceService]
})
export class FeatureListComponent implements OnInit {
  private sub: any;
  private userId: number;

  constructor(private route: ActivatedRoute, private featureService : FeatureServiceService) { }

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
       this.getFeaturesForUser();
  });
  }

}
