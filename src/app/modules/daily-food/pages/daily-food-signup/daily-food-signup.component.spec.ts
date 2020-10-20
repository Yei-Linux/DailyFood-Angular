import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyFoodSignupComponent } from './daily-food-signup.component';

describe('DailyFoodSignupComponent', () => {
  let component: DailyFoodSignupComponent;
  let fixture: ComponentFixture<DailyFoodSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyFoodSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyFoodSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
