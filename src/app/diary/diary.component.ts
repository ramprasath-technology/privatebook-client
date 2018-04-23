//Importing components required for diary page
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Diary } from '../models/diary';

import { DiaryService } from '../services/diary.service';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css'],
  providers: [DiaryService]
})

//Creating class for diary page
export class DiaryComponent implements OnInit {
  sub: any;
  userId: number;
  entryId: number;
  editorContent: any;
  content: string = "";
  showSuccess: boolean = false;
  showError: boolean = false;
  successMessage: string = "Whoa! Your memories are safe with us.";
  errorMessage: string = "Ouch! There has been an issue in saving your memories. Don't worry, we're working on it.";
  save: boolean = true;
  entryToModify: Diary;

  //Constructor initalization
  constructor(private router: Router, private route: ActivatedRoute, private diaryService: DiaryService, private elementRef: ElementRef) { }

  //Helper method to construct diary object
  constructDiaryEntry(): Diary {
    let diaryEntry = new Diary();
    diaryEntry.date = new Date();
    diaryEntry.entry = this.content;
    diaryEntry.userId = this.userId;
    console.log(diaryEntry.date + 'is the date');
    return diaryEntry;
  }

  //Navigating back to diary list
  goBack(){
    this.router.navigate([`diarylist`, this.userId]);
  }

  //Add new diary entry
  addEntry() {
    console.log(this.content);
    let diaryEntry: Diary = this.constructDiaryEntry();
    this.diaryService.addDiaryEntry(diaryEntry)
      .subscribe((response) => {
        this.showSuccess = true;
      }, (error) => {
        this.showError = true;
      });
  }

  //Edit diary entry
  editEntry() {
    this.entryToModify.entry = this.content;
    this.diaryService.updateDiaryEntry(this.entryId, this.entryToModify)
      .subscribe((response) => {
        this.showSuccess = true;
      }, (error) => {
        this.showError = true;
      });
  }

  //Reset entry
  resetEntry() {
    this.content = "";
  }

  //Get diary entry
  getEntry() {
    this.diaryService.getDiaryEntry(this.entryId)
      .subscribe((response) => {
        this.entryToModify = response.json();
        console.log(this.entryToModify);
        this.content = this.entryToModify.entry;
      }, (error) => {

      });
  }

  //Decide if it is adding new entry or editing an entry
  decideAction() {
    if (this.entryId !== 0) {
      this.save = false;
      this.getEntry();
    }
  }

  //Initializing page
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.userId = +params['userId'];
      this.entryId = +params['entryId'];
      this.decideAction();
    });
  }

   ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.minHeight = "100vh";
    this.elementRef.nativeElement.ownerDocument.body.style.background = "linear-gradient(#fff,#ccf5ff)";
  }

}
