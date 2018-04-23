//Importing components to be used by event page
import { Component, OnInit, ElementRef } from '@angular/core';
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

//Creating class for event page
export class EventComponent implements OnInit {
  //Variable declaration
  events: Event[] = [];
  eventsToDisplay: Event[] = [];
  isModalOpen: boolean = false;
  private sub: any;
  private userId: number;
  successMessage = "Yes, we have saved your event";
  errorMessage = "There has been an error in saving your event";
  showSuccess: boolean = false;
  showError: boolean = false;
  eventNumber: number = 0;
  totalLength: number = 0;
  pages: number[] = [];
  page: number = 1;
  progressValue = 0;
  displayPage: boolean = false;

  //Constructor initialization
  constructor(private eventService: EventService, private route: ActivatedRoute, private spinnerService: Ng4LoadingSpinnerService, private elementRef: ElementRef) {
  }

  //Search events based on date
  searchEvents(searchForm: NgForm) {
    let searchTerms: EventSearchTerms = searchForm.value;
    searchTerms.userId = this.userId;
    this.eventService.searchEvent(searchTerms)
      .subscribe(response => {
        this.formatEvents(response.json());
      },
      (error) => {
      });
  }

  //Show success message on saving event
  showSuccessMessage() {
    this.showSuccess = true;
    this.showError = false;
  }

  //Show error message is event is not saved
  showErrorMessage() {
    this.showError = true;
    this.showSuccess = false;
  }

  //Reset success and error messages
  resetMessages() {
    this.showError = false;
    this.showSuccess = false;
  }

  //Helper function to assign defaults
  assignEventDefaults(newEvent: any): Event {
    let event = new Event();
    event.userId = this.userId;
    let eventDate: Date = newEvent.eventDate;
    let dateArray: string[] = newEvent.eventDate.split('-');
    let timeArray: string[] = newEvent.eventTime.split(':');
    event.time = new Date();
    event.time.setFullYear(parseInt(dateArray[0]), (parseInt(dateArray[1])-1), (parseInt(dateArray[2]) - 1));
    event.time.setHours(parseInt(timeArray[0]));
    event.time.setMinutes(parseInt(timeArray[1]));
    event.eventName = newEvent.eventName;
    event.eventDescription = newEvent.eventDescription;
    return event;
  }

  //Save a new event
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

  //Get all events for a user
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

  convertDateFormat(min: string): string{
    let stringFormat = min.split(':');
    let splicedMin = stringFormat[1].slice(0, stringFormat.indexOf(':'));
    let hours: number = parseInt(stringFormat[0]);
    let minutes: number = parseInt(splicedMin);
    let timeOfDay: string = "AM";
    let finalHr: string;
    let finalMin: string;

    if(hours > 12){
      hours = hours%12;
      timeOfDay = "PM";
    }
    if(hours < 10)
       finalHr = `0${hours.toString()}`;
    else
      finalHr = hours.toString();

    if(minutes < 10)
      finalMin = `0${minutes.toString()}`;
    else
      finalMin = minutes.toString();    
    return `${finalHr}:${finalMin} ${timeOfDay}`;
  }

  //Format events for pretty display
  formatEvents(events: Event[]) {
    this.assignProgress(80);
    this.events = [];
    events.map((event, index) => {
      event["eventNumber"] = ++index;
      let stringFormat = event.time.toString().split('T');
      let date = event.time.toString().split('T')[0];
      let time = event.time.toString().split('T')[1];
      event["dateString"] = `${date} ${this.convertDateFormat(time)}`;
      this.events.push(event);
    });
    this.totalLength = this.events.length;
    this.changePage(1);
  }

  //Delete an event
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

  //Close event creation pop-up
  closeModal() {
    this.resetMessages();
  }

  //Assign progress
  assignProgress(number: number) {
    this.progressValue = number;
  }

  //Pagination
  changePage(pageNumber) {
    let start = pageNumber * 10 - 9 - 1;
    let end = pageNumber * 10;
    this.eventsToDisplay = this.events.slice(start, end);
  }

  //Initialize page
  ngOnInit() {
    this.spinnerService.show();
    this.sub = this.route.params.subscribe(params => {
      this.userId = +params['userId'];
      this.getEvents();
    });
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.minHeight = "100vh";
    this.elementRef.nativeElement.ownerDocument.body.style.background = "linear-gradient(#fff,#ccf5ff)";
  }

}
