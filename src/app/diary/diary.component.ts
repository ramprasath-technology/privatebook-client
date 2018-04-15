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
editorContent: any;
content: string = "";

  constructor(private router: Router, private route: ActivatedRoute, private diaryService: DiaryService) { }

  constructDiaryEntry(): Diary{
    let diaryEntry = new Diary();
    diaryEntry.date = new Date();
    diaryEntry.entry = this.content;
    diaryEntry.userId = this.userId;
    console.log(diaryEntry.date + 'is the date');
    return diaryEntry;
  }

  addEntry(){
    console.log(this.content);
    let diaryEntry: Diary = this.constructDiaryEntry();
    this.diaryService.addDiaryEntry(diaryEntry)
      .subscribe( (response) => {

      }, (error) => {

      });
  }

  resetEntry(){
    this.content = "";
  }

  ngOnInit() {
     this.sub = this.route.params.subscribe(params => {
      this.userId = +params['userId'];
    });
  }

}
