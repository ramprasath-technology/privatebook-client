import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonexistentFeatureListComponent } from './nonexistent-feature-list.component';

describe('NonexistentFeatureListComponent', () => {
  let component: NonexistentFeatureListComponent;
  let fixture: ComponentFixture<NonexistentFeatureListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonexistentFeatureListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonexistentFeatureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
