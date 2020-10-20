import { Component,Input,ViewChildren,OnInit,IterableDiffers,DoCheck } from '@angular/core';

import { IngredientsComponent } from '../ingredients/ingredients.component';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { FoodByDayComponent } from '../food-by-day/food-by-day.component';
import { Food } from '../../models/food.model';
import { FoodIngredientsDetail } from '../../models/food-ingredients-detail.model';
import { FoodService } from '../../services/food.service';
import { DayService } from '../../services/day.service';
import { CdkHelper } from '../../helpers/cdk.helper';
import { IngredientsFood } from '../../models/ingredients-food.model';
import { IngredientsFoodState } from '../../states/ingredients-food.state';

@Component({
  selector: 'making-food',
  templateUrl: './making-food.component.html',
  styleUrls: ['./making-food.component.scss']
})
export class MakingFoodComponent implements OnInit {

  @Input() ingredientsComponent: IngredientsComponent;
  @Input() foodByDayComponent: FoodByDayComponent;

  public weekSchema = ['monday','thursday','wednesday','tuesday','friday','saturday','sunday'];

  public food: Food= new Food;
  public foodIngredientsDetail: FoodIngredientsDetail= new FoodIngredientsDetail;

  public comboDayWithNotFood=[];

  public differ: any;

  constructor(private ingredientsFoodState : IngredientsFoodState,private foodService: FoodService,private dayService: DayService,private cdkHelper: CdkHelper,differs: IterableDiffers) { 
    this.differ = differs.find([]).create(null);
  }

  ngOnInit() {
    this.getComboDayswithNotFood();
  }

  ngDoCheck() {
    const change = this.differ.diff(this.ingredientsFoodState.ingredients);
    !this.ingredientsFoodState.isViewDetailToUpdateWithData && this.managmentDragAndDropIngredientsWithSize(change);
  }

  public get ingredientsFoodStateGetter() {
    return this.ingredientsFoodState;
  }

  public managmentDragAndDropIngredientsWithSize(change : any) {
    if(change){
      if(change['_additionsHead']) {
        let newIngredient = change['_additionsHead']['item']['ingredientId'];
        this.ingredientsFoodState.sizeIngredient[newIngredient];
      }
      if(change['_removalsHead']) {
        let removedIngredient = change['_removalsHead']['item']['ingredientId'];
        delete this.ingredientsFoodState.sizeIngredient[removedIngredient];
      }
    }
  }
  
  public dropItem(event: CdkDragDrop<string[]>) {
    this.ingredientsFoodState.isViewDetailToUpdateWithData = false;
    this.cdkHelper.drop(event); 
  }

  public async getComboDayswithNotFood(){
    let { data: { weekSchema } }= await this.dayService.getDaysSchemaByUserId(JSON.parse(localStorage.getItem("data_user"))["userId"]).toPromise();
    this.comboDayWithNotFood = Object.keys(weekSchema).filter( day => weekSchema[day] === 0 );
  }

  public async createFoodDetails() {
    this.generateFoodDetail();
    await this.foodService.createFoodDetails(this.foodIngredientsDetail,JSON.parse(localStorage.getItem("data_user"))["userId"]).toPromise();
    await this.getComboDayswithNotFood();
    await this.foodByDayComponent.getFoodDetailsOfWeek();
    this.clearData();
  }

  public async updateFoodDetails() {
    this.generateFoodDetail();
    await this.foodService.updateFoodDetails(this.foodIngredientsDetail,JSON.parse(localStorage.getItem("data_user"))["userId"]).toPromise();
    await this.getComboDayswithNotFood();
    await this.foodByDayComponent.getFoodDetailsOfWeek();
    this.clearData();
  }

  public async clearData() {
    this.ingredientsFoodState.food = new Food;
    await this.ingredientsComponent.getIngredients();
    this.ingredientsFoodState.ingredients.length = 0;
    this.ingredientsFoodState.sizeIngredient = {};
    this.ingredientsFoodState.initialIngredientIds.length = 0;
  }

  public generateFoodDetail() {
    this.food = this.ingredientsFoodState.food;
    this.food.userId = JSON.parse(localStorage.getItem("data_user"))["userId"];
    this.foodIngredientsDetail.foodRequest = this.food;
    this.foodIngredientsDetail.day = this.ingredientsFoodState.daySelected;
    this.foodIngredientsDetail.userId = JSON.parse(localStorage.getItem("data_user"))["userId"];
    this.foodIngredientsDetail.ingredientsFoodList = this.ingredientsFoodState.isUpdate? this.generateIngredientsFoodListToUpdate() : this.generateIngredientsFoodList();
  }

  public generateIngredientsFoodListToUpdate() {
    let ingredientsFood: IngredientsFood[] = new Array<IngredientsFood>() ;

    this.ingredientsFoodState.ingredients.map( ingredient =>{
      let ingredientFood: IngredientsFood = new IngredientsFood;
      if(this.ingredientsFoodState.initialIngredientIds.includes(ingredient.ingredientId)){
        ingredientFood.isUpdated = true; 
      } 
      ingredientFood.foodId = this.ingredientsFoodState.food.foodId;
      ingredientFood.ingredientId = ingredient.ingredientId;
      ingredientFood.size = this.ingredientsFoodState.sizeIngredient[ingredient.ingredientId];
      ingredientsFood.push(ingredientFood);
    });

    this.ingredientsFoodState.initialIngredientIds.map( ingredientId =>{
      let resultsFound = this.ingredientsFoodState.ingredients.filter( ingredient => ingredient.ingredientId == ingredientId );
      if(resultsFound.length == 0) {
        let ingredientFood: IngredientsFood = new IngredientsFood;
        ingredientFood.isDeleted = true;
        ingredientFood.foodId = this.ingredientsFoodState.food.foodId;
        ingredientFood.ingredientId = ingredientId;
        ingredientFood.size = this.ingredientsFoodState.sizeIngredient[ingredientId];
        ingredientsFood.push(ingredientFood);
      }
    })

    return ingredientsFood;
  }

  public generateIngredientsFoodList() {
    let ingredientsFood: IngredientsFood[] = new Array<IngredientsFood>() ;
    this.ingredientsFoodState.ingredients.map( ingredient => {
      let ingredientFood: IngredientsFood = new IngredientsFood;
      ingredientFood.ingredientId = ingredient.ingredientId;
      ingredientFood.size = this.ingredientsFoodState.sizeIngredient[ingredient.ingredientId];
      ingredientsFood.push(ingredientFood);
    });
    return ingredientsFood;
  }
}
