import { Component } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { FormHelper } from '../lib/formHelper';
import { data } from '../mocks';

console.log('init ProfileEditorComponent');
const log = console.log.bind(console);

// const data=[ {firstName:'forst name'}];

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent {

  profileForm2 = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [''],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    }),
    aliases: this.fb.array([
      this.fb.group({
        pippo: [''],
        list: this.fb.array([
          this.fb.group({
            element: [''],

          })
        ])
      })
    ])
  });

  profileForm = this.fb.group({
    id: [''],
    stato: [''],
    configurazione_regola: this.fb.array([
      this.fb.group({
        caratteristiche_evento: this.fb.group({
          motivo_evento: [''],
          tipo_entita_partitario: ['']
        }),
        caratteristiche_movimento: this.fb.array([
          this.fb.group({
            tipo_entita_partitario: [''],
            codice_causale: [''],
            tipo_importo: ['']
          })
        ])
      })
    ]),
  });

  get caratteristicheMovimento(){

    return (this.profileForm.get('configurazione_regola')  as FormArray).controls[0].get('caratteristiche_movimento') as FormArray;
  }

 addCarMovimento() {
    this.caratteristicheMovimento.push(this.fb.group({
      pippo: [''],
      list: this.fb.array([
        this.fb.group({
          element: ['']
        })
      ])

    }));
  }


  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }

  getLists(i: number): FormArray {
    return this.aliases.controls[i].get('list') as FormArray;
  }

  constructor(private fb: FormBuilder) {

    this.profileForm.patchValue(data);

    // const h = new FormHelper(fb);
    // const out = h.generateFbFromModel(data);
    // console.log(out);
  }

  updateProfile() {

    const h = new FormHelper(this.fb);
    // const out = h.generateFbFromModel(data);
    // console.log(out);

    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street'
      },
      aliases: [{ pippo: 'aaa', list: [{ element: 'lll' }, { element: 'bbbb' }, { element: 'dddd' }] }]
    });
  }

  addAlias() {
    this.aliases.push(this.fb.group({
      pippo: [''],
      list: this.fb.array([
        this.fb.group({
          element: ['']
        })
      ])

    }));
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/