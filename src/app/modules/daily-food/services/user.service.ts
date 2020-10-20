import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private httpHeaders=new HttpHeaders({'Content-Type':'application/json'});
  constructor(private http: HttpClient) { }

  public isTokenInLocalStorage() {
    if (localStorage.getItem("access_token") != null) {
      return true;
    }
    return false;
  }
  public authenticationUser(username: any,password: any) {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${environment.identity_credentials.client_id}:${environment.identity_credentials.client_secret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const data = new HttpParams()
    .set('username', username)
    .set('password', password)
    .set('grant_type', environment.identity_credentials.grant_type);

    return this.http.post(
      environment.api.login_user,
      data,
      {headers: headers}
    );
  }
  public createUser(user : User): Observable<any>{
    return this.http.post<any>(environment.api.create_user,user,{headers:this.httpHeaders});
  }
}
