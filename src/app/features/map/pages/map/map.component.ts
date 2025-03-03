import {AfterViewInit, Component, inject, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {Observable} from 'rxjs';
import {LocationsService} from '../../services/locations.service';
import {AsyncPipe} from '@angular/common';
import {Location} from '../../models/Location';

@Component({
  selector: 'app-map',
  imports: [
    AsyncPipe
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit, OnInit {
  private map!: L.Map
  markers: L.Marker[] = [
    L.marker([54.372158, 18.638306])
  ];

  private readonly locationsService = inject(LocationsService);

  ngOnInit(): void {
    this.locationsService.getLocations().subscribe(locations => {
      locations.forEach(location => {
        const marker = new CustomMarker(location)
          .addTo(this.map);
        this.markers.push(marker);
      });
    });
  }

  ngAfterViewInit() {
    this.initMap();
    this.centerMap();
  }

  private initMap() {
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    this.map = L.map('map');
    L.tileLayer(baseMapURl).addTo(this.map);
  }


  private centerMap() {
    const bounds = L.latLngBounds(this.markers.map(marker => marker.getLatLng()));

    this.map.fitBounds(bounds);

    L.control.scale().addTo(this.map);
  }
}

class CustomMarker extends L.Marker {
  constructor(public location: Location) {
    super([location.latitude, location.longitude]);
  }
}
