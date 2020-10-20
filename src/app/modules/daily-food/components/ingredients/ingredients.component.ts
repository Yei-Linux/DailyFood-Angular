import { Component, OnInit } from '@angular/core';

import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { IngredientService } from '../../services/ingredient.service';
import { CdkHelper } from '../../helpers/cdk.helper';
import { IngredientsFoodState } from '../../states/ingredients-food.state';

@Component({
  selector: 'ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit {
  public title: string="Ingredients";
  public ingredients= [];

  constructor(private ingredientsFoodState : IngredientsFoodState,private ingredientService: IngredientService,private cdkHelper: CdkHelper) { }

  ngOnInit() {
    this.getIngredients();
  }

  public async getIngredients(){
    let { data } = await this.ingredientService.getIngredients().toPromise();
    this.ingredients = data;
    this.ingredientsFoodState.allIngredients = data;
  }

  public filterIngredients(ingredientIdsToFilter : any[]) {
    this.ingredients =  this.ingredientsFoodState.allIngredients.filter( ingredient => !ingredientIdsToFilter.includes(ingredient.ingredientId)  );
  }

  public dropItems (event: CdkDragDrop<string[]>) {
    this.cdkHelper.drop(event);
  }
}
