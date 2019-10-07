import { Component, OnInit, Input, TemplateRef } from '@angular/core';


@Component({
  selector: 'dinamic-contenr',
  template: `
    <ng-template #headerTemplate>
      <div class="default-content">
            Default headerTemplate
      </div>
    </ng-template>
    
    <ng-template #bodyTemplate>
      <div class="default-content">
            Default bodyTemplate
      </div>
    </ng-template>

    <ng-template #defaultContent >
      <div class="default-content">
            Default footerTemplate
      </div>
    </ng-template>

    <ng-container [ad-host]="headerTemplate ? headerTemplate: defaultHeader">
    </ng-container>
    <ng-container  [ad-host]="bodyTemplate ? bodyTemplate: defaulbody">
    </ng-container>
    <ng-container [ad-host]="footerTemplate ? footerTemplate: defaultFooter">
    </ng-container>

`})

export class DinamicContentComponent {
  @Input() headerTemplate: TemplateRef<any>;
  @Input() bodyTemplate: TemplateRef<any>;
  @Input() footerTemplate: TemplateRef<any>;
}
