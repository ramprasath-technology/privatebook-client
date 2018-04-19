import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { CKEditorModule } from 'ng2-ckeditor';

import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { AppComponent } from './app.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { UserSigninComponent } from './user-signin/user-signin.component';
import { FeatureListComponent } from './feature-list/feature-list.component';
import { NonexistentFeatureListComponent } from './nonexistent-feature-list/nonexistent-feature-list.component';

import { UserService } from './services/user.service';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AppRoutingModule } from './/app-routing.module';
import { HeaderComponent } from './header/header.component';
import { ToDoComponent } from './to-do/to-do.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LandingHeaderComponent } from './landing-header/landing-header.component';
import { StockComponent } from './stock/stock.component';
import { EventComponent } from './event/event.component';
import { DiaryListComponent } from './diary-list/diary-list.component';
import { DiaryComponent } from './diary/diary.component';
import { FooterComponent } from './footer/footer.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ErrorPageComponent } from './error-page/error-page.component';






@NgModule({
  declarations: [
    AppComponent,
    UserSignupComponent,
    UserSigninComponent,
    FeatureListComponent,
    NonexistentFeatureListComponent,
    LandingPageComponent,
    HeaderComponent,
    ToDoComponent,
    NavbarComponent,
    LandingHeaderComponent,
    StockComponent,
    EventComponent,
    DiaryListComponent,
    DiaryComponent,
    FooterComponent,
    ContactUsComponent,
    AboutUsComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    AngularFontAwesomeModule,
    Ng4LoadingSpinnerModule.forRoot(),
    CKEditorModule
  ],
  
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
