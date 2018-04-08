import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CommonService {
  private userSource = new BehaviorSubject<number>(0);
  currentUserId = this.userSource.asObservable();

  constructor() { }

  changeMessage(message: number) {
    this.userSource.next(message)
  }

}
