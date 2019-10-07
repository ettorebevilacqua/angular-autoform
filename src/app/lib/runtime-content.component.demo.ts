import { Component, Input } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';

@Component({
    selector: 'runtime-content-demo',
    template: `
        <div>
            <h2>Runtime content</h2>
            <runtime-content></runtime-content>
        </div>
    `
})
export class RuntimeContentComponentDemo {
   @Input() group: FormGroup;
}