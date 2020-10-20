import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DayService {
  constructor(private http : HttpClient) { }

  public getDaysSchemaByUserId(userId: string): Observable<any>{
    return this.http.get<any>(environment.api.get_days_schema_by_user_id.replace('{{id}}',userId));
  }
  public deleterFoodOfDay(userId: string,day: string): Observable<any>{
    return this.http.delete<any>(environment.api.delete_food_of_day.replace('{{userId}}',userId).replace('{{day}}',day));
  }
}
