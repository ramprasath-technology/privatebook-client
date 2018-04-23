//Importing component required for navigation bar
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [CommonService]
})

//Creating class for navigation bar
export class NavbarComponent implements OnInit {
  //Variable declaration
  userId: number;

  //Constructor initialization
  constructor(private commonService: CommonService, private router: Router) { }

  //Routing according to user selection
  redirect(feature: string) {
    if (feature === "about" || feature === "contact")
      this.router.navigate([`/${feature}`]);
    else
      this.router.navigate([`/${feature}`, this.userId]);


  }

  //Initializing page with session variable
  ngOnInit() {
    this.userId = +sessionStorage.getItem('userId');
  }

}
