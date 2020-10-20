import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest  } from '@angular/common/http'
import { Observable } from 'rxjs'
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

import { Token } from '../models/token.model';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
    public token : Token;
    public refreshTokenInProgress = false;
    public refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor() {
        this.token = new Token();
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = this.token.addAuthenticationToken(request);
        return next.handle(request);
    }
}