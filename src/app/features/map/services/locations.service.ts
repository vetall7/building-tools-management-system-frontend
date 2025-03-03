import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Location} from '../models/Location';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  private readonly httpClient = inject(HttpClient);

  public getLocations(): Observable<Location[]> {
    return this.httpClient.get<Location[]>('/api/building-works/locations');
  }
}
