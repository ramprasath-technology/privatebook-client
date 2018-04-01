import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Common } from '../models/common';

@Injectable()
export class FeatureServiceService {

  constructor(private http: Http) { }

    getFeaturesForUser(id: Number){
    var url = `${Common.BASE_API_URL}api/UserFeatureMappings/GetFeatureByUser/${id}`;
    return this.http.get(url);
  }

  createFeaturesForUser(id: Number){
    var url = `${Common.BASE_API_URL}api/UserFeatureMappings/AddFeaturesToUser/${id}`;
    return this.http.get(url);
  }

}
