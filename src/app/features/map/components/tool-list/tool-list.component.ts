import {Component, inject} from '@angular/core';
import {ToolsService} from '../../services/tools.service';
import {AsyncPipe, CommonModule} from '@angular/common';
import {ToolSingleComponent} from '../tool-single/tool-single.component';

@Component({
  selector: 'app-tool-list',
  imports: [
    CommonModule,
    AsyncPipe,
    ToolSingleComponent
  ],
  templateUrl: './tool-list.component.html',
  styleUrl: './tool-list.component.css'
})
export class ToolListComponent {
  private readonly toolsService = inject(ToolsService);

  tools$ = this.toolsService.getTools();
}
