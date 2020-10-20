import { SharedModule } from 'src/app/shared/shared.module'
import { CoreModule } from 'src/app/core/core.module'

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { DailyFoodRoutingModule } from './daily-food-routing.module';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { MakingFoodComponent } from './components/making-food/making-food.component';
import { FoodByDayComponent } from './components/food-by-day/food-by-day.component';
import { HeaderComponent } from './layout/header/header.component'
import { DragDropModule } from '@angular/cdk/drag-drop';

import { DailyFoodLayoutComponent } from './layout/daily-food.component';
import { DailyFoodPageComponent } from './pages/daily-food-page/daily-food-page.component';
import { FoodService } from './services/food.service';
import { IngredientService } from './services/ingredient.service';
import { DayService } from './services/day.service';
import { IngredientsFoodState } from "./states/ingredients-food.state";
import { SearchFoodComponent } from './components/search-food/search-food.component';
import { DailyFoodSignupComponent } from './pages/daily-food-signup/daily-food-signup.component';
import { DailyFoodSigninComponent } from './pages/daily-food-signin/daily-food-signin.component';
import { UserService } from './services/user.service';

const DAILY_FOOD__PAGES = [DailyFoodLayoutComponent,DailyFoodPageComponent,DailyFoodSignupComponent,DailyFoodSigninComponent]

const DAILY_FOOD__COMPONENTS = [FoodByDayComponent,IngredientsComponent,MakingFoodComponent,HeaderComponent,SearchFoodComponent]

const DAILY_FOOD__SERVICES = [FoodService,IngredientService,DayService,IngredientsFoodState,UserService]

const DAILY_FOOD__ENTRY_COMPONENTS = []

@NgModule({
  declarations: [...DAILY_FOOD__PAGES, ...DAILY_FOOD__COMPONENTS],
  imports: [SharedModule, CoreModule, DailyFoodRoutingModule, FormsModule,DragDropModule, ReactiveFormsModule,Ng2SearchPipeModule],
  exports: [...DAILY_FOOD__COMPONENTS],
  entryComponents: [...DAILY_FOOD__ENTRY_COMPONENTS],
  providers: [...DAILY_FOOD__SERVICES],
})
export class DailyFoodModule {};