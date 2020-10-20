import { Component, OnInit, Input } from '@angular/core';
import { IngredientsFoodState } from '../../states/ingredients-food.state';
import { FoodByDayComponent } from '../../components/food-by-day/food-by-day.component';
import { IngredientsComponent } from '../../components/ingredients/ingredients.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() foodByDayComponent : FoodByDayComponent;
  @Input() ingredientsComponent : IngredientsComponent;
  
  constructor(private ingredientsFoodState : IngredientsFoodState,
    private route: ActivatedRoute,
    private router: Router) { }
    
  ngOnInit() {
  }

  public get ingredientsFoodStateGetter() {
    return this.ingredientsFoodState;
  }

  public handleLogout() {
    localStorage.removeItem('data_user');
    this.router.navigateByUrl("/sign-in");
  }
}
