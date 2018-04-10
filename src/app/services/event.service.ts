import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Event } from '../models/event';
import { Common } from '../models/common';


@Injectable()
export class EventService {

  constructor(private http: Http) { }

  submitEvent(event: Event){
    let url = Common.BASE_API_URL;
    let completeUrl = `${url}api/events`;

    return this.http.post(completeUrl, event);
  }

  getEvents(userId: number){
    let url = Common.BASE_API_URL;
    let completeUrl = `${url}api/events/user/${userId}`;

    return this.http.get(completeUrl);
  }

  deleteEvent(eventId: number){
    let url = Common.BASE_API_URL;
    let completeUrl = `${url}api/events/${eventId}`;

    return this.http.delete(completeUrl);
  }

}
