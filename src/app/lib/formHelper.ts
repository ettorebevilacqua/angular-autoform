// https://github.com/jamesmcnamara/shades
// ngTemplateOutlet

import {
  FormBuilder,
  Validators,
  FormArray,
  FormGroup,
  FormControl
} from "@angular/forms";
import { scan } from "./helper";
import { dataTypes, getDataType, DataTypeInfo, EventSwitch } from "./dataTypes";
import { EventInfo, ObjWalker } from "./scan";

export type BuilderData = FormGroup | FormArray | FormControl;
export type modelData = Object;

interface InputsForm {
  path: string;
  id: string;
  label: string;
  maxLength: number;
  placeholder: string;
}

export class FormHelper {
  model: any;
  form: FormGroup = this.fb.group({});
  html: Array<string> = [];

  constructor(public fb: FormBuilder) {}

  cleanForm() {
    this.form = this.fb.group({});
  }

  onObject(acc, key, obj, path, isEnd) {
    if (isEnd) {
      this.html.push(key === "" ? "</form>" : "</div>");
      return acc;
    }
    const group = this.fb.group({});
    if (key === "") {
      this.html.push('<form [formGroup]="formGroup" (ngSubmit)="onSubmit()">');
    } else {
      const temp =
        acc.constructor && acc.constructor.name === "FormArray"
          ? acc.push(group)
          : acc.addControl(key, group);
      this.html.push('<div formGroupName="' + key + '">');
    }

    // console.log('onObject path=', path, acc);

    return key === "" ? acc : group;
  }

  onArray(acc, key, list, path, isEnd) {
    if (isEnd) {
      this.html.push(key === "" ? "</form>" : "</div>");
      return acc;
    }
    //  console.log('onArray  path=', path);
    const arr = this.fb.array([]);
    if (key === "") {
      this.html.push('<form [formGroup]="formGroup" (ngSubmit)="onSubmit()")');
    } else {
      const temp =
        acc.constructor && acc.constructor.name === "FormArray"
          ? acc.push(arr)
          : acc.addControl(key, arr); // new FormArray([]); // acc.addControl(key, arr);
    }
    this.html.push('<div formArrayName="' + key + '">');

    return arr;
  }

  onValue(acc, key, value, path, typeValue) {
    // console.log('onValue path=', path);

    const ctrl = this.fb.control(value); // new FormControl(value); // this.fb.array([]);
    if (acc.constructor && acc.constructor.name === "FormArray") {
      // const fg =  this.fb.group({});
      // fg.addControl(key, ctrl);
      acc.push(ctrl);
    } else {
      acc.addControl(key, ctrl);
    }

    this.html.push('<input type="text" formControlName="' + key + '">');
    return acc;
  }

  getHtml() {
    return this.html.join("\n");
  }

  scanNew(fb: FormBuilder, model) {
    type ctrlForm = FormGroup | FormArray | FormControl;
    const startForm: ctrlForm = this.fb.group({});
    const eventSwitch = (currentForm) => {
    const addFormCtrl = ( key, ctrl)=> (currentForm.addControl(key ,ctrl), ctrl);
   
    const addToFormArray = (ctrl) => (currentForm.push(ctrl), ctrl);
    const setForm = ctrl => currentForm = ctrl;
      return {
      onObject: (infoevent, param) => setForm(addFormCtrl( infoevent.key,   fb.group({}))),
      onArray: (infoevent, param) => setForm(addToFormArray(infoevent.key)),
      onValue: (infoevent, param) => addFormCtrl( infoevent.key,   fb.control(infoevent.value))
    };

    const swithcer = EventSwitch(eventSwitch(startForm));
    const walker = ObjWalker(
      startForm,
      model,
      (currentForm, infoevent: EventInfo) => {
        swithcer
        const ctrl: ctrlForm =
          infoevent.type === dataTypes.object
            ? fb.group({})
            : infoevent.type === dataTypes.array
            ? fb.array([])
            : fb.control(infoevent.value);

        currentForm.constructor && currentForm.constructor.name === "FormArray"
          ? (currentForm as FormArray).push(ctrl)
          : (currentForm as FormGroup).addControl(
              infoevent.key as string,
              ctrl
            );

        console.log("scanNew", currentForm);
        return infoevent.isValue ? currentForm : ctrl;
      }
    );
    return walker;
  }

  generateFbFromModel(model): any {
    const typeValue = getDataType(model);
    const fb =
      typeValue === dataTypes.array
        ? this.fb.array([])
        : typeValue === dataTypes.object
        ? this.fb.group({})
        : this.fb.control(null);

    console.log("infoevent xx y");
    this.scanNew(this.fb, model);

    const scanner = scan(
      this.onObject.bind(this),
      this.onArray.bind(this),
      this.onValue.bind(this)
    );
    /*   this.form = scanner(fb, model) as FormGroup;
    console.log("generateFbFromModel ", this.form);
    console.log("generateFbFromModel html ", this.html);
    return this.form; */
  }
}
