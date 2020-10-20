  
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core/core.module";
import { AuthGuard } from './core/guards/auth.guard';
import { DailyFoodSigninComponent } from './modules/daily-food/pages/daily-food-signin/daily-food-signin.component';
import { DailyFoodSignupComponent } from './modules/daily-food/pages/daily-food-signup/daily-food-signup.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: "",
    loadChildren: () =>
      import("src/app/modules/daily-food/daily-food.module").then(
        m => m.DailyFoodModule
      )
  },
  {
    path: 'sign-in',
    canActivate: [AuthGuard],
    component: DailyFoodSigninComponent,
  },
  {
    path: 'sign-up',
    canActivate: [AuthGuard],
    component: DailyFoodSignupComponent,
  }
];

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    CoreModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule {}