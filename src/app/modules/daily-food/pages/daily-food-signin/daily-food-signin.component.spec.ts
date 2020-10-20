import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyFoodSigninComponent } from './daily-food-signin.component';

describe('DailyFoodSigninComponent', () => {
  let component: DailyFoodSigninComponent;
  let fixture: ComponentFixture<DailyFoodSigninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyFoodSigninComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyFoodSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
