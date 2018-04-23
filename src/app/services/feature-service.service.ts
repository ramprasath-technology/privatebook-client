import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Common } from '../models/common';

@Injectable()
export class FeatureServiceService {

  constructor(private http: Http) { }

  //Get features for user
  getFeaturesForUser(id: Number) {
    var url = `${Common.BASE_API_URL}api/UserFeatureMappings/GetFeatureByUser/${id}`;
    return this.http.get(url);
  }

  //Create features for user
  createFeaturesForUser(id: Number) {
    var url = `${Common.BASE_API_URL}api/UserFeatureMappings/AddFeaturesToUser/${id}`;
    return this.http.get(url);
  }

  //Remove particular feature
  removeFeature(featureToRemove: any) {
    var url = `${Common.BASE_API_URL}api/UserFeatureMappings/UserFeatureToRemove`;
    console.log(featureToRemove);
    return this.http.post(url, featureToRemove);
  }

  //Add new feature
  addFeature(featureToAdd: any) {
    var url = `${Common.BASE_API_URL}api/UserFeatureMappings/UserFeatureToAdd`;
    return this.http.post(url, featureToAdd);
  }

}
