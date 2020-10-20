import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodByDayComponent } from './food-by-day.component';

describe('FoodByDayComponent', () => {
  let component: FoodByDayComponent;
  let fixture: ComponentFixture<FoodByDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodByDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodByDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
