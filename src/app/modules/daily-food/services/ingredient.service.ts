import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private httpHeaders=new HttpHeaders({'Content-Type':'application/json'});
  constructor(private http : HttpClient) { }

  public getIngredients(): Observable<any>{
    return this.http.get<any>(environment.api.get_ingredients);
  }
}
