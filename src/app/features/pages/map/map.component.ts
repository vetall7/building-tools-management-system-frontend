import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit {
  private map!: L.Map
  markers: L.Marker[] = [
    L.marker([54.372158, 18.638306])
  ];


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
