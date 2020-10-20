import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { CryptProcessService } from './services/crypt-process.service';
import { TokenInterceptor } from './interceptors/token-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

const CORE_COMPONENTS = [];
const CORE_SERVICES = [
  CryptProcessService,
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
]

@NgModule({
  declarations: [...CORE_COMPONENTS],
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
  providers: [...CORE_SERVICES],
  exports: [...CORE_COMPONENTS],
})
export class CoreModule {};