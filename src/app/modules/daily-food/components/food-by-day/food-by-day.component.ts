import { Component, OnInit, Input } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { FoodIngredientsDetail } from '../../models/food-ingredients-detail.model';
import { IngredientsFoodState } from '../../states/ingredients-food.state';
import { IngredientsFood } from '../../models/ingredients-food.model';
import { IngredientsComponent } from '../ingredients/ingredients.component';
import { DayService } from '../../services/day.service';

@Component({
  selector: 'food-by-day',
  templateUrl: './food-by-day.component.html',
  styleUrls: ['./food-by-day.component.scss']
})
export class FoodByDayComponent implements OnInit {
  @Input() ingredientsComponent: IngredientsComponent;
  
  public foodsByDayOfWeek : FoodIngredientsDetail[];
  public daysAgo: string = "5";

  constructor(private ingredientsFoodState : IngredientsFoodState,private foodService: FoodService,private dayService: DayService) { }

  ngOnInit() {
    this.getFoodDetailsOfWeek();
  }

  public async getFoodDetailsOfWeek(){
    let { data }  = await this.foodService.getFoodDetailsOfWeek(JSON.parse(localStorage.getItem("data_user"))["userId"]).toPromise();
    this.foodsByDayOfWeek = data;
  }

  public handleClickFoodDetail(foodByDay : FoodIngredientsDetail) {
    this.ingredientsFoodState.clearDataState();
    if(foodByDay.foodRequest) {
      this.ingredientsFoodState.isUpdate = true;
      this.ingredientsFoodState.isViewDetailToUpdateWithData = true;
      const { ingredientsList, ingredientIdsList, sizeIngredientsList } = this.generateIngredientsAnsSizeList(foodByDay.ingredientsFoodList);
      
      this.ingredientsComponent.filterIngredients(ingredientIdsList);

      this.ingredientsFoodState.ingredients = ingredientsList;
      this.ingredientsFoodState.initialIngredientIds = ingredientIdsList;
      this.ingredientsFoodState.sizeIngredient = sizeIngredientsList;
      this.ingredientsFoodState.food = foodByDay.foodRequest;
      this.ingredientsFoodState.daySelected = foodByDay.day;
    }else{
      this.ingredientsFoodState.isUpdate && this.ingredientsComponent.getIngredients();
      this.ingredientsFoodState.isViewDetailToUpdateWithData = false;
      this.ingredientsFoodState.isUpdate = false;
    }
  }

  public async handleQuitFood(foodByDay : FoodIngredientsDetail) {
    await this.dayService.deleterFoodOfDay(JSON.parse(localStorage.getItem("data_user"))["userId"],foodByDay.day).toPromise();
    await this.getFoodDetailsOfWeek();
  }

  public generateIngredientsAnsSizeList(ingredientFoodList : IngredientsFood[]) {
    let ingredientsList = [];
    let ingredientIdsList = [];
    let sizeIngredientsList = {};
    ingredientFoodList.map( ingredientFoodItem =>{
      ingredientIdsList.push(ingredientFoodItem.ingredientId);
      ingredientsList.push({ingredientId: ingredientFoodItem.ingredientId,ingredient : ingredientFoodItem.ingredient});
      sizeIngredientsList[ingredientFoodItem.ingredientId] = ingredientFoodItem.size;
    });
    return {ingredientsList,ingredientIdsList,sizeIngredientsList}
  }
}
