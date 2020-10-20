import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FoodIngredientsDetail } from '../models/food-ingredients-detail.model';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private httpHeaders=new HttpHeaders({'Content-Type':'application/json'});
  constructor(private http: HttpClient) { }

  public createFoodDetails(foodDetails : FoodIngredientsDetail,userId : string): Observable<any>{
    return this.http.post<any>(environment.api.create_food_details.replace("{{id}}", userId),foodDetails,{headers:this.httpHeaders});
  }
  public getFoodDetailsOfWeek(userId : string): Observable<any>{
    return this.http.get<any>(environment.api.get_food_details_of_week.replace("{{id}}", userId),{headers:this.httpHeaders});
  }
  public getFoodDetailsByFoodId(foodId : number): Observable<any>{
    return this.http.get<any>(environment.api.get_food_details_by_food_id.replace("{{foodId}}", foodId.toString()),{headers:this.httpHeaders});
  }
  public getFoodsByUserId(userId : string): Observable<any>{
    return this.http.get<any>(environment.api.get_foods_by_user.replace("{{userId}}", userId),{headers:this.httpHeaders});
  }
  public updateFoodDetails(foodDetails : FoodIngredientsDetail,userId : string): Observable<any>{
    return this.http.put<any>(environment.api.create_food_details.replace("{{id}}", userId),foodDetails,{headers:this.httpHeaders});
  }
}
