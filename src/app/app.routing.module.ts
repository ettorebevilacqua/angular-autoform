import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NameEditorComponent } from './name-editor/name-editor.component';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';
import { RuntimeContentComponent } from './lib/runtime-content.component';
import { RuntimeContentComponentDemo } from './lib/runtime-content.component.demo';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NameEditorComponent, ProfileEditorComponent, RuntimeContentComponent,RuntimeContentComponentDemo
  ],
  imports: [
    ReactiveFormsModule, BrowserModule,FormsModule,
    RouterModule.forRoot([
      { path: 'profile', component: ProfileEditorComponent },
      { path: 'name', component: NameEditorComponent },
      { path: 'dinamic-comp', component: RuntimeContentComponent },
       { path: 'dinamic', component: RuntimeContentComponentDemo },
      { path: '**', redirectTo: 'name' }
    ])
  ],
  exports: [
    RouterModule,
  ],
  providers: [],

})
export class AppRoutingModule { }