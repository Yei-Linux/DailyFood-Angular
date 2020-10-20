  
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CryptProcessService {
  encryptedKey(){
    return CryptoJS.enc.Base64.parse(environment.daily_food.key);
  };

  encrypt(val: string): string {
    let encrypted = CryptoJS.AES.encrypt(val, this.encryptedKey(), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
      });
    return encrypted.toString();
  }

  decrypt(toDecrypt: string): any {
    let decrypted =  CryptoJS.AES.decrypt( toDecrypt, this.encryptedKey(), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString( CryptoJS.enc.Utf8 );
  }

  replaceSpecialsCharactersOfUrl(routeURL : string){
    return routeURL.replace(/_/g,'/').replace(/-/g,'+');
  }
}