import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Event } from '../models/event';
import { EventSearchTerms } from '../models/event-search-terms';
import { EventService } from '../services/event.service';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  providers: [EventService, Ng4LoadingSpinnerService]
})
export class EventComponent implements OnInit {
  events: Event[] = [];
  eventsToDisplay: Event[] = [];
  isModalOpen: boolean = false;
  private sub: any;
  private userId: number;
  successMessage = "Your event has been saved successfully";
  errorMessage = "There has been an error in saving your event";
  showSuccess: boolean = false;
  showError: boolean = false;
  eventNumber: number = 0;
  totalLength: number = 0;
  pages: number[] = [];
  page: number = 1;
  progressValue = 0;
  displayPage: boolean = false;
  
  constructor(private eventService: EventService, private route: ActivatedRoute, private spinnerService: Ng4LoadingSpinnerService) {
  }

searchEvents(searchForm: NgForm){
  //console.log(searchForm);
  let searchTerms : EventSearchTerms = searchForm.value;
  searchTerms.userId = this.userId;
  console.log(searchTerms);
  this.eventService.searchEvent(searchTerms)
    .subscribe(response => {
      console.log(response.json());
    },
    (error) => {
      console.log(error);
    });
}
  showSuccessMessage() {
    this.showSuccess = true;
    this.showError = false;
  }

  showErrorMessage() {
    this.showError = true;
    this.showSuccess = false;
  }

  resetMessages() {
    this.showError = false;
    this.showSuccess = false;
  }

  assignEventDefaults(newEvent: any): Event {
    let event = new Event();
    event.userId = this.userId;
    let eventDate : Date = newEvent.eventDate;
    let dateArray: string[] = newEvent.eventDate.split('-');
    let timeArray: string[] = newEvent.eventTime.split(':');
    event.time = new Date();
    event.time.setFullYear(parseInt(dateArray[0]),parseInt(dateArray[1]),parseInt(dateArray[2]));
    event.time.setHours(parseInt(timeArray[0]));
    event.time.setMinutes(parseInt(timeArray[1]));
    event.eventName = newEvent.eventName;
    event.eventDescription = newEvent.eventDescription;
    return event;
  }


  saveEvent(form: NgForm) {
    let newEvent = form.value;
    newEvent = this.assignEventDefaults(newEvent);
    console.log(newEvent);
    this.eventService.submitEvent(newEvent)
      .subscribe(
      (response) => {
        this.showSuccessMessage();
        form.resetForm();
        this.getEvents();
      },
      (error) => {
        this.showErrorMessage();
      }
      );
  }

  getEvents() {
    
    this.eventService.getEvents(this.userId)
      .subscribe(
      (response) => {
        this.formatEvents(response.json());
        this.spinnerService.hide();
      },
      (error) => {
        this.spinnerService.hide();
      }
      );
  }

  formatEvents(events: Event[]) {
    this.assignProgress(80);
    this.events = [];
    events.map((event, index) => {
      event["eventNumber"] = ++index;
      this.events.push(event);
    });

    this.totalLength = this.events.length;

    this.changePage(1);
  }

  deleteEvent(eventId: number) {
    this.eventService.deleteEvent(eventId)
      .subscribe(
      (response) => {
        this.getEvents();
      },
      (error) => {

      }
      );
  }

  closeModal() {
    this.resetMessages();
  }

  assignProgress(number: number) {
    this.progressValue = number;
  }

  changePage(pageNumber) {
    let start = pageNumber * 10 - 9 - 1;
    let end = pageNumber * 10;
    this.eventsToDisplay = this.events.slice(start, end);
  }

  ngOnInit() {
    this.spinnerService.show();
    this.sub = this.route.params.subscribe(params => {
      this.userId = +params['userId'];
      this.getEvents();
    });
  }

}
