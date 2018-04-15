import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Diary } from '../models/diary';

import { DiaryService } from '../services/diary.service';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css'],
  providers: [DiaryService]
})
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

  constructor(private router: Router, private route: ActivatedRoute, private diaryService: DiaryService) { }

  constructDiaryEntry(): Diary {
    let diaryEntry = new Diary();
    diaryEntry.date = new Date();
    diaryEntry.entry = this.content;
    diaryEntry.userId = this.userId;
    console.log(diaryEntry.date + 'is the date');
    return diaryEntry;
  }

  goBack(){
    this.router.navigate([`diarylist`, this.userId]);
  }

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

  editEntry() {
    this.entryToModify.entry = this.content;
    this.diaryService.updateDiaryEntry(this.entryId, this.entryToModify)
      .subscribe((response) => {
        this.showSuccess = true;
      }, (error) => {
        this.showError = true;
      });
  }

  resetEntry() {
    this.content = "";
  }

  getEntry() {
    this.diaryService.getDiaryEntry(this.entryId)
      .subscribe((response) => {
        this.entryToModify = response.json();
        console.log(this.entryToModify);
        this.content = this.entryToModify.entry;
      }, (error) => {

      });
  }

  decideAction() {
    if (this.entryId !== 0) {
      this.save = false;
      this.getEntry();
    }
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.userId = +params['userId'];
      this.entryId = +params['entryId'];
      this.decideAction();
    });
  }

}
