import { Injectable } from '@angular/core';
import { Common } from '../models/common';
import { Http } from '@angular/http';

@Injectable()
export class WeatherService {

  constructor(private http: Http) { }

  //Get weather details
  getWeatherDetails(lat: number, lon: number) {
    let baseUrl = Common.BASE_API_URL;
    let fullUrl = `${baseUrl}api/Weather`;
    let obj = { "latitude": lat, "longitude": lon };
    return this.http.post(fullUrl, obj);
  }
}
