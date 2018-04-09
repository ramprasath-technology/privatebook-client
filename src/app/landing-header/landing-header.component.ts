import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-landing-header',
  templateUrl: './landing-header.component.html',
  styleUrls: ['./landing-header.component.css']
})
export class LandingHeaderComponent implements OnInit {
@Output() signinClicked = new EventEmitter();
accountExists: boolean = true;
  constructor() { }

emitEvent(){
  this.signinClicked.emit(this.accountExists);
  this.accountExists = !this.accountExists;
}


  ngOnInit() {
  }

}
