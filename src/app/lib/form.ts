import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { FormHelper } from './formHelper';

@Component({
  selector: 'etto-auto-form',
   template: '<h3>title xxx</h3>',
  // styleUrls: ['./name-editor.component.css']
})
export class EttoAutoForm implements OnInit {

  constructor(private fb: FormBuilder) {
    const h = new FormHelper(fb);
  }

  ngOnInit() {
    // this.template="<p><template xxx </p>";
  }

  updateName() {
    // this.name.setValue('Nancy');
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/