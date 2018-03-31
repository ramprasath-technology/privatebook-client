import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { UserSigninComponent } from './user-signin/user-signin.component';
import { FeatureListComponent } from './feature-list/feature-list.component';
import { FeaturesToaddComponent } from './features-toadd/features-toadd.component';
import { NonexistentFeatureListComponent } from './nonexistent-feature-list/nonexistent-feature-list.component';


@NgModule({
  declarations: [
    AppComponent,
    UserSignupComponent,
    UserSigninComponent,
    FeatureListComponent,
    FeaturesToaddComponent,
    NonexistentFeatureListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
