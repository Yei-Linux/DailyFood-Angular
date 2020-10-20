import { Injectable } from '@angular/core';
import { Food } from '../models/food.model';

@Injectable({
  providedIn: 'root'
})
export class IngredientsFoodState {
  public allFoods = [];
  public allIngredients = [];
  public ingredients = [];
  public initialIngredientIds = [];
  public sizeIngredient = {};
  public daySelected : any = '';
  public searchIngredientDetail = '';
  public food : Food = new Food;
  public isUpdate : boolean = false;
  public isFoodSearched : boolean = false;
  public isViewDetailToUpdateWithData : boolean = false;
  
  constructor() { }

  public clearDataState() {
    this.isFoodSearched = false;
    this.ingredients = [];
    this.sizeIngredient = [];
    this.daySelected = '';
    this.food = new Food;
  }
}
