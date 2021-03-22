import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromComponents from './components';
import * as fromContainers from './containers';
import { OtherPagesDaRoutingModule } from './other-pages-da-routing.module';


@NgModule({
  declarations: [
    ...fromComponents.components,
    ...fromContainers.containers
  ],
  imports: [
    CommonModule,
    OtherPagesDaRoutingModule
  ]
})
export class OtherPagesDaModule { }
