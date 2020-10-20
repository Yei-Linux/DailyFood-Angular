import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DailyFoodLayoutComponent } from './layout/daily-food.component';
import { DailyFoodPageComponent } from './pages/daily-food-page/daily-food-page.component';
import { DailyFoodSigninComponent } from './pages/daily-food-signin/daily-food-signin.component';
import { DailyFoodSignupComponent } from './pages/daily-food-signup/daily-food-signup.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { HomeGuard } from 'src/app/core/guards/home.guard';

const routes: Routes = [
    {
      path: 'home',
      canActivate: [HomeGuard],
      component: DailyFoodLayoutComponent,
      children: [
        {
          path: '',
          component: DailyFoodPageComponent,
        }
      ]
    },
  ]
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class DailyFoodRoutingModule {}