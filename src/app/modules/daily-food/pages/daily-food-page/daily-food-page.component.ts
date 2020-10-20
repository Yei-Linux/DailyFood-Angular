import { Component, OnInit } from '@angular/core';
import { IngredientsFoodState } from '../../states/ingredients-food.state';
import { FoodService } from '../../services/food.service';

@Component({
  selector: 'app-daily-food-page',
  templateUrl: './daily-food-page.component.html',
  styleUrls: ['./daily-food-page.component.scss']
})
export class DailyFoodPageComponent implements OnInit {
  public title = 'DailyFood';
  constructor(private ingredientsFoodState : IngredientsFoodState, private foodService : FoodService) { }

  ngOnInit() {
    this.getFoodDetails();
  }

  public async getFoodDetails() {
    this.foodService.getFoodsByUserId(JSON.parse(localStorage.getItem("data_user"))["userId"]).subscribe(({ data } : any) =>{
      this.ingredientsFoodState.allFoods = data;
    });
  }
}
