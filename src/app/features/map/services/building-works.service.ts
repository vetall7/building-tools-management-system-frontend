import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BuildingWorkDetailed} from '../models/BuildingWorkDetailed';

@Injectable({
  providedIn: 'root'
})
export class BuildingWorksService {
  private readonly httpClient = inject(HttpClient);

  public getBuildingWorkDetails(buildingWorkId: String): Observable<BuildingWorkDetailed> {
    return this.httpClient.get<BuildingWorkDetailed>('/api/building-works/' + buildingWorkId);
  }
}
