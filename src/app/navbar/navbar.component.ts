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

  /*redirect(route){
        this.router.navigate([`/${route}`, this.userId]);
  }*/

  redirect(feature: string) {
    if (feature === "about" || feature === "contact")
      this.router.navigate([`/${feature}`]);
    else
      this.router.navigate([`/${feature}`, this.userId]);


  }



  loadAboutUs() {

  }

  loadContactUs() {

  }

  ngOnInit() {
    this.userId = +sessionStorage.getItem('userId');
  }

}
