import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { FeatureListComponent } from './feature-list/feature-list.component';
import { ToDoComponent } from './to-do/to-do.component';
import { EventComponent } from './event/event.component';
import { DiaryComponent } from './diary/diary.component';
import { DiaryListComponent } from './diary-list/diary-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingPageComponent },
  { path: 'featurelist/:userId', component: FeatureListComponent },
  { path: 'todo/:userId', component: ToDoComponent },
  { path: 'event/:userId', component: EventComponent },
  { path: 'diary/:userId/:entryId', component: DiaryComponent},
  { path: 'diarylist/:userId', component: DiaryListComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
