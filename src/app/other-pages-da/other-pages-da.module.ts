import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromComponents from './components';
import * as fromContainers from './containers';
import { OtherPagesDaRoutingModule } from './other-pages-da-routing.module';
import {NgxDropzoneModule} from "ngx-dropzone";


@NgModule({
  declarations: [
    ...fromComponents.components,
    ...fromContainers.containers
  ],
    imports: [
        CommonModule,
        OtherPagesDaRoutingModule,
        NgxDropzoneModule
    ]
})
export class OtherPagesDaModule { }
