import {Component, Input} from '@angular/core';
import {BuildingWorkDetailed} from '../../models/BuildingWorkDetailed';
import {Button} from 'primeng/button';
import {MessageService} from 'primeng/api';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {ToolListComponent} from '../tool-list/tool-list.component';

@Component({
  selector: 'app-pop-up',
  imports: [
    Button
  ],
  providers: [DialogService, MessageService],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.css'
})
export class PopUpComponent {
  @Input() buildingWork: BuildingWorkDetailed | null = null;

  ref: DynamicDialogRef | undefined;

  constructor(public dialogService: DialogService, public messageService: MessageService) {}

  show() {
    this.ref = this.dialogService.open(ToolListComponent, {
      header: 'Select a Product',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      closable: true
    });
  }
}
