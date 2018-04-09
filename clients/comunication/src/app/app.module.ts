import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { ControllersComponent } from './controllers/controllers.component';
import { PlatformsComponent } from './platforms/platforms.component';

import { MaterialModule } from './shared/material.module';

@NgModule({
  declarations: [
    AppComponent,
    ControllersComponent,
    PlatformsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
