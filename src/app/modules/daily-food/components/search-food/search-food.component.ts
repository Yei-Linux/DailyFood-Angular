import { Component, OnInit, Input } from "@angular/core";
import { IngredientsFoodState } from "../../states/ingredients-food.state";
import { FoodService } from "../../services/food.service";
import { IngredientsFood } from "../../models/ingredients-food.model";
import { FoodByDayComponent } from "../food-by-day/food-by-day.component";
import { IngredientsComponent } from "../ingredients/ingredients.component";

@Component({
  selector: "search-food",
  templateUrl: "./search-food.component.html",
  styleUrls: ["./search-food.component.scss"]
})
export class SearchFoodComponent implements OnInit {
  @Input() foodByDayComponent: FoodByDayComponent;
  @Input() ingredientsComponent: IngredientsComponent;

  public foodSelected: any;
  public foodDetail: IngredientsFood = new IngredientsFood();

  constructor(
    private ingredientsFoodState: IngredientsFoodState,
    private foodService: FoodService
  ) {}

  ngOnInit() {}

  public get ingredientsFoodStateGetter() {
    return this.ingredientsFoodState;
  }

  public async handleSelectFood() {
    let { data } = await this.foodService.getFoodDetailsByFoodId(this.foodSelected).toPromise();
    this.ingredientsFoodState.clearDataState();
    this.ingredientsFoodState.isUpdate = true;
    this.ingredientsFoodState.isFoodSearched = true;
    this.ingredientsFoodState.isViewDetailToUpdateWithData = true;
    const {
      ingredientsList,
      ingredientIdsList,
      sizeIngredientsList
    } = this.foodByDayComponent.generateIngredientsAnsSizeList(
      data.ingredientsFoodList
    );

    this.ingredientsComponent.filterIngredients(ingredientIdsList);

    this.ingredientsFoodState.ingredients = ingredientsList;
    this.ingredientsFoodState.initialIngredientIds = ingredientIdsList;
    this.ingredientsFoodState.sizeIngredient = sizeIngredientsList;
    this.ingredientsFoodState.food = data.foodRequest;
    this.ingredientsFoodState.daySelected = data.day;
  }
}
