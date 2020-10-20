import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakingFoodComponent } from './making-food.component';

describe('MakingFoodComponent', () => {
  let component: MakingFoodComponent;
  let fixture: ComponentFixture<MakingFoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakingFoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakingFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
