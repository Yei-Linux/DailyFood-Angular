import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyFoodPageComponent } from './daily-food-page.component';

describe('DailyFoodPageComponent', () => {
  let component: DailyFoodPageComponent;
  let fixture: ComponentFixture<DailyFoodPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyFoodPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyFoodPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
