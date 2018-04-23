//Importing components required for about-us page
import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})

//Creating class for about-us page
export class AboutUsComponent implements OnInit, AfterViewInit {

//Constructor initialization
  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
  }

   ngAfterViewInit(){
         this.elementRef.nativeElement.ownerDocument.body.style.minHeight = "100vh";
         this.elementRef.nativeElement.ownerDocument.body.style.background = "linear-gradient(#fff, #008fb3)";
      }

}
