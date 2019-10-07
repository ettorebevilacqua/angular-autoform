import {
  Component, Input,
  ViewChild, ViewContainerRef, ComponentRef,
  Compiler, ComponentFactory, NgModule, ModuleWithComponentFactories, ComponentFactoryResolver
} from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup, } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EttoAutoForm } from './form';

@Component({
  selector: 'runtime-content',
  template: `
        <div>
        
            <h3>Template</h3>
            <div>
                <textarea rows="6" col="44" [(ngModel)]="template"></textarea>
            </div>
            <button (click)="compileTemplate()">Compile</button>
            <h3>Output</h3>
           
              <div #container></div>
      
        </div>
    `
})
export class RuntimeContentComponent {

  @Input() template: string = '<form [formGroup]="formGroup" (ngSubmit)="onSubmit()">  <input type="text" formControlName="a"> </form><div>\nHello, {{name}}\n</div>';
  @Input() formGroup: FormGroup;

  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;

  private componentRef: ComponentRef<{}>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private compiler: Compiler) {
  }

  compileTemplate() {

    let metadata = {
      selector: `runtime-component-sample`,
      template: this.template
    };

    let factory = this.createComponentFactorySync(this.compiler, metadata, null, this.formGroup);

    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
    this.componentRef = this.container.createComponent(factory);
  }

  private createComponentFactorySync(compiler: Compiler, metadata: Component, componentClass: any, formGroup: FormGroup): ComponentFactory<any> {
    const cmpClass = componentClass || class RuntimeComponent { name: string = 'Denys'; formGroup: FormGroup = formGroup };
    const decoratedCmp = Component(metadata)(cmpClass);

    @NgModule({ imports: [CommonModule, ReactiveFormsModule], declarations: [decoratedCmp] })
    class RuntimeComponentModule { }

    let module: ModuleWithComponentFactories<any> = compiler.compileModuleAndAllComponentsSync(RuntimeComponentModule);
    return module.componentFactories.find(f => f.componentType === decoratedCmp);
  }

}