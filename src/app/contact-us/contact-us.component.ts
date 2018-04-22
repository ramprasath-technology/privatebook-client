import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
  }
 ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.minHeight = "100vh";
    this.elementRef.nativeElement.ownerDocument.body.style.background = "linear-gradient(#fff,#ccf5ff)";
  }

}
