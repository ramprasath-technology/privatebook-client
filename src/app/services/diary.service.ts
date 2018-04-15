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

  getDiaryEntriesByUser(userId: number){
    let url = Common.BASE_API_URL;
    let completeUrl = `${url}api/Diaries/GetDiaryEntriesByUser/${userId}`;
    return this.http.get(completeUrl);
  }

  getDiaryEntry(entryId: number){
    let url = Common.BASE_API_URL;
    let completeUrl = `${url}api/Diaries/${entryId}`;
    return this.http.get(completeUrl);
  }

  updateDiaryEntry(entryId: number, entry: Diary){
    let url = Common.BASE_API_URL;
    let completeUrl = `${url}api/Diaries/${entryId}`;
    return this.http.put(completeUrl, entry);
  }

}
