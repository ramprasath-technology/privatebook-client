import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Diary } from '../models/diary';

import { DiaryService } from '../services/diary.service';

@Component({
  selector: 'app-diary-list',
  templateUrl: './diary-list.component.html',
  styleUrls: ['./diary-list.component.css'],
  providers: [DiaryService]
})
export class DiaryListComponent implements OnInit {
  userId: number;
  sub: any;
  totalLength = 0;
  entriesToDisplay: Diary[] = [];
  entries: Diary[] = [];
  page = 1;

  constructor(private router: Router, private route: ActivatedRoute, private diaryService: DiaryService) { }


  getDiaryEntries() {
    this.diaryService.getDiaryEntriesByUser(this.userId)
      .subscribe((response) => {
        this.entries = response.json();
        this.totalLength = this.entries.length;
        this.changePage(1);
      }, (error) => {

      });
  }

  editEntry(entryId: number){
    this.router.navigate(['diary', this.userId, entryId]);

  }
  getDatePart(date) {
    return date.split('T')[0];
  }

  changePage(pageNumber) {
    let start = pageNumber * 10 - 9 - 1;
    let end = pageNumber * 10;
    this.entriesToDisplay = this.entries.slice(start, end);
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.userId = +params['userId'];
      this.getDiaryEntries();
    });
  }

  openEditor() {
    this.router.navigate(['diary', this.userId, 0]);
  }

}
