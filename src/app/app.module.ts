import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { UserSigninComponent } from './user-signin/user-signin.component';
import { FeatureListComponent } from './feature-list/feature-list.component';
import { NonexistentFeatureListComponent } from './nonexistent-feature-list/nonexistent-feature-list.component';

import { UserService } from './services/user.service';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AppRoutingModule } from './/app-routing.module';
import { HeaderComponent } from './header/header.component';




@NgModule({
  declarations: [
    AppComponent,
    UserSignupComponent,
    UserSigninComponent,
    FeatureListComponent,
    NonexistentFeatureListComponent,
    LandingPageComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
