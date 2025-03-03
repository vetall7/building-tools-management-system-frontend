import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {ToolShort} from '../models/ToolShort';
import {ToolDetailed} from '../models/ToolDetailed';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  private readonly http = inject(HttpClient);

  public getTools(): Observable<ToolShort[]> {
    return this.http.get<{ tools: ToolShort[] }>('/api/tools').pipe(
      map((response) => response.tools)
    );
  }

  public getToolDetails(toolId: String): Observable<ToolDetailed> {
    return this.http.get<ToolDetailed>('/api/tools/' + toolId);
  }
}
