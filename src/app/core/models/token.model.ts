import { HttpRequest } from '@angular/common/http';

export class Token {
    constructor(){}
    addAuthenticationToken(request : HttpRequest<any>) : any {
        let dataUser = JSON.parse(localStorage.getItem('data_user'));
        if(request.url != 'http://localhost:8089/dailyFood/api/users' && request.url != 'http://localhost:8089/dailyFood/api/oauth/token'){
            if (dataUser != null) {
                request = request.clone({
                    setHeaders: {
                        authorization: `Bearer ${dataUser['access_token']}`
                    },
                })
            }
        }
        return request;
    }
}