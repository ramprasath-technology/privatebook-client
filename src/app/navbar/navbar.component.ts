import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [CommonService]
})
export class NavbarComponent implements OnInit {
userId: number;
  constructor(private commonService: CommonService, private router: Router) { }

  loadFeatures(){

  }

  loadAboutUs(){

  }

  loadContactUs(){
    
  }

  ngOnInit() {
    
  }

}
