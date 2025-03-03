import {Component, inject, Input} from '@angular/core';
import {ToolShort} from '../../models/ToolShort';
import {ToolsService} from '../../services/tools.service';
import {AsyncPipe} from '@angular/common';
import {Observable} from 'rxjs';
import {ToolDetailed} from '../../models/ToolDetailed';

@Component({
  selector: 'app-tool-single',
  imports: [
    AsyncPipe
  ],
  templateUrl: './tool-single.component.html',
  styleUrl: './tool-single.component.css'
})
export class ToolSingleComponent {
  @Input() tool: ToolShort | null = null;

  private readonly toolsService = inject(ToolsService);

  protected toolDetailed$ : Observable<ToolDetailed> | null = null;

  ngOnInit() {
    if (!this.tool) {
      return;
    }
    this.toolDetailed$ = this.toolsService.getToolDetails(this.tool.id);
  }
}
