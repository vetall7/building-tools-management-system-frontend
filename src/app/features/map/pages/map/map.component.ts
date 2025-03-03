import {AfterViewInit, Component, ComponentFactoryResolver, inject, OnInit, ViewContainerRef} from '@angular/core';
import * as L from 'leaflet';
import {LocationsService} from '../../services/locations.service';
import {AsyncPipe} from '@angular/common';
import {Location} from '../../models/Location';
import {BuildingWorksService} from '../../services/building-works.service';
import {BuildingWorkDetailed} from '../../models/BuildingWorkDetailed';
import {PopUpComponent} from '../../components/pop-up/pop-up.component';

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

  private readonly buildingWorksService = inject(BuildingWorksService);

  private readonly viewContainerRef = inject(ViewContainerRef);

  private readonly resolver = inject(ComponentFactoryResolver);

  ngOnInit(): void {
    this.locationsService.getLocations().subscribe(locations => {
      locations.forEach(location => {
        const marker = new CustomMarker(location)
          .addTo(this.map);
        this.markers.push(marker);

        marker.on('click', () => {
          this.buildingWorksService.getBuildingWorkDetails(location.id).subscribe((buildingWork) =>
            marker.bindPopup(this.createPopupContent(buildingWork)).openPopup());
          });
      });
    });
  }

  ngAfterViewInit() {
    this.initMap();
    this.centerMap();
  }

  private createPopupContent(buildingWork: BuildingWorkDetailed): HTMLElement {
    const factory = this.resolver.resolveComponentFactory(PopUpComponent);
    const componentRef = this.viewContainerRef.createComponent(factory);

    componentRef.instance.buildingWork = buildingWork;

    return componentRef.location.nativeElement;
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
    const markerIcon = L.icon({
      iconUrl: 'assets/marker-icon.png',
      iconSize: [70, 41],
      iconAnchor: [13, 41],
      popupAnchor: [0, -41],
    });
    super([location.latitude, location.longitude], { icon: markerIcon });
  }
}
