import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Diary } from '../models/diary';
import { Common } from '../models/common';

@Injectable()
export class DiaryService {

  constructor(private http: Http) { }

  addDiaryEntry(entry: Diary){
    let url = Common.BASE_API_URL;
    let completeUrl = `${url}api/Diaries`;
    return this.http.post(completeUrl, entry);
  }

}
