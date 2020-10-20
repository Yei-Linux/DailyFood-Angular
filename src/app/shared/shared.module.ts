import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'

import { SpinnerComponent } from './components/spinner/spinner.component'

const MODULES = [CommonModule, RouterModule, HttpClientModule ];
const COMPONENTS = [SpinnerComponent];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES, ...COMPONENTS],
  declarations: [...COMPONENTS],
})
export class SharedModule {}