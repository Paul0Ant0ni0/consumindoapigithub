import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Githubuser } from 'src/app/interfaces/githubuser';
import { AfterViewInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { MapsApiService } from 'src/app/services/maps-api.service';
import { UserLocation } from 'src/app/interfaces/userlocation';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit{
  @ViewChild('map') // Pegano a referencia do elemento com id=map do html
  mapContainer!: ElementRef;
  map: any;

  public loading: boolean = true;

  public userLocation!: UserLocation;
  
  constructor(@Inject(MAT_DIALOG_DATA) public user: Githubuser, private mapService: MapsApiService){
    this.getLatLong(user.location); // Método para buscar a latitude e longetude do usuário
  }
  ngOnInit(): void {
   
    
  }



  //Método para render o mapa na tela
  //Recebemdp a localização do usuário (latitude e longetude)
  public renderMap(userLocation: UserLocation): void{
    //Criando o mapa na tela com base na referencia da localização
    //Number(userLocation.lat) -. convertendo de string para number
    this.loading = false;
    const map = L.map('map').setView([Number(userLocation.lat), Number(userLocation.lon)], 13);
    //Passando o mapa para div com id=map no html
    this.map = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    //Marcador e estilização
    L.circle([Number(userLocation.lat), Number(userLocation.lon)], {
      color: 'red',
      fillColor: '#158552',
      fillOpacity: 0.5,
      radius: 500
  }).addTo(map);
  }
  
  //Método para pegar a latitude e longetude que recebe como parametro a cidade dp usuário
  public getLatLong(city: string): void{
    // Recuperando a lista
    this.mapService.getLatLong(city).subscribe((valor: UserLocation[]) => {
      // Extraindo o primeiro valor da lista
      valor.forEach(v => this.renderMap(v))
      
      
    })
  }

}