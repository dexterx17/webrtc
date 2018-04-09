import { NgModule } from '@angular/core';

import {
  MatButtonModule, 
  MatCheckboxModule,
  MatIconModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule
  ],
  declarations: [],
  exports:[
  	MatButtonModule,
    MatCheckboxModule,
    MatIconModule
  ]
})
export class MaterialModule { }
