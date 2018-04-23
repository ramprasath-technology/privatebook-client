//Importing component used by diary list page
import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Diary } from '../models/diary';

import { DiaryService } from '../services/diary.service';

@Component({
  selector: 'app-diary-list',
  templateUrl: './diary-list.component.html',
  styleUrls: ['./diary-list.component.css'],
  providers: [DiaryService]
})

//Creating class for diary list
export class DiaryListComponent implements OnInit {
  //Variable declaration
  userId: number;
  sub: any;
  totalLength = 0;
  entriesToDisplay: Diary[] = [];
  entries: Diary[] = [];
  page = 1;

  //Constructor initialization
  constructor(private router: Router, private route: ActivatedRoute, private diaryService: DiaryService, private elementRef: ElementRef) { }

  //Getting diary entries for user
  getDiaryEntries() {
    this.diaryService.getDiaryEntriesByUser(this.userId)
      .subscribe((response) => {
        this.entries = response.json();
        this.totalLength = this.entries.length;
        this.changePage(1);
      }, (error) => {

      });
  }

  //Editing diary entry
  editEntry(entryId: number) {
    console.log(entryId);
    this.router.navigate(['diary', this.userId, entryId]);

  }

  //Getting date part from datetime object
  getDatePart(date) {
    return date.split('T')[0];
  }

  //Pagination
  changePage(pageNumber) {
    let start = pageNumber * 10 - 9 - 1;
    let end = pageNumber * 10;
    this.entriesToDisplay = this.entries.slice(start, end);
  }

  //Initializing diary list page
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.userId = +params['userId'];
      this.getDiaryEntries();
    });
  }

  //Redirecting to editor page
  openEditor() {
    this.router.navigate(['diary', this.userId, 0]);
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.minHeight = "100vh";
    this.elementRef.nativeElement.ownerDocument.body.style.background = "linear-gradient(#fff,#ccf5ff)";
  }

}
