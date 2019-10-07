import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { FormHelper } from '../lib/formHelper';
import { data } from '../mocks';


function mckData(){
 const listS3 = [{ a: 'a' }, { q1: 'q1' }, { bb: 'bb', cc: ['a', 'b', 'c'] }];
  const subModel1 = [{ s1: 's1', s3: 's2' }];
//  return  {  m: subModel1 , b: ['b1', 'b2', 'b3'] , c:listS3}; //  a: 'a1', c: 'c1',
 return {"piano_ammortamento":{"configurazione_piano":{"configurazione_ammortamento":{"configurazione_scadenzario":{"parametri_scadenzario":{"parametri_effettiva":{"spostamento_data_scadenza_effettiva":"NON_APPLICABILE"},"parametri_esigibilita":{"spostamento_in_avanti_previsto":false},"parametri_nominale":{"modalita_calcolo_prima_scadenza":"PERIODICITA_ESATTA","scadenza_nominale_fine_mese":true},"parametri_termine_pagamento":{"posticipazione_prevista":false},"parametri_valuta":{"giorni_avanti":0,"giorni_indietro":0,"tipo_spostamento":"NON_APPLICABILE"}},"piazze":["CALENDARIO_TARGET"]},"tassi":[]},"importi":[{}],"divisa":"EUR","collocamento_resto":"SU_ULTIMA_RATA","tipo_corresponsione":"POSTICIPATO","tipo_arrotondamento":"PER_DIFETTO","giorno_erogazione_incluso":false,"algoritmo_calcolo":"PIANO_ITALIANO_CAPITALE_COSTANTE"},"rate":[]},"utente":"ettore bevilacqua","data_registrazione":"Thu Feb 14 2019 12:54:09 GMT+0100"};
}

@Component({
  selector: 'app-name-editor',
  templateUrl: './name-editor.component.html',
  styleUrls: ['./name-editor.component.css']
})
export class NameEditorComponent implements OnInit {
  /* profileForm = this.fb.group({
     id: [''],
     stato: ['']
   });*/

  model = mckData();
  profileForm = {};
  template: string = "init template";
  constructor(private fb: FormBuilder) {
    const h = new FormHelper(fb);
    //    model = { a: 'a1', b: ['b1', 'b2'], c: { ac: '11', bc: '22' } };

    const out = h.generateFbFromModel(this.model);
    this.profileForm = h.form;
    this.template = h.getHtml();
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