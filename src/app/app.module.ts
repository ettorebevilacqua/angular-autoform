import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { DinamicComponentDirective } from './lib/dinamic-component.directive';
import { DinamicContentComponent } from './lib/dinamic-content/dinamic-content.component';

@NgModule({
  declarations: [
   //  DinamicContentComponent,
    AppComponent,
    DinamicComponentDirective,
   
  ],
  imports: [
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/