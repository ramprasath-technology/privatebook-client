import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Event } from '../models/event';
import { Common } from '../models/common';
import { EventSearchTerms } from '../models/event-search-terms';


@Injectable()
export class EventService {

  constructor(private http: Http) { }

  //Submit event for saving
  submitEvent(event: Event){
    let url = Common.BASE_API_URL;
    let completeUrl = `${url}api/events`;

    return this.http.post(completeUrl, event);
  }

  //Get events for user
  getEvents(userId: number){
    let url = Common.BASE_API_URL;
    let completeUrl = `${url}api/events/user/${userId}`;

    return this.http.get(completeUrl);
  }

  //Delete particular event
  deleteEvent(eventId: number){
    let url = Common.BASE_API_URL;
    let completeUrl = `${url}api/events/${eventId}`;

    return this.http.delete(completeUrl);
  }

  //Search events
  searchEvent(searchTerms : EventSearchTerms){
    let url = Common.BASE_API_URL;
    let completeUrl = `${url}api/Events/search/${searchTerms.startDate}/${searchTerms.endDate}/${searchTerms.userId}`;

    return this.http.get(completeUrl);
  }

}
