import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css'],
})
export class ToDoComponent implements OnInit {
todos = [];
isModalOpen : boolean = false;

  constructor() {
    let obj = { "seq": "1", "name": "event1"};
    let obj2 = {"seq": "2", "name": "event2"};
    this.todos.push(obj);
    this.todos.push(obj2);

   }

   toggleModal(){
     this.isModalOpen = !this.isModalOpen;
   }

   closeModal(){

   }

   submitEvent(){

   }

  ngOnInit() {
  }

}
