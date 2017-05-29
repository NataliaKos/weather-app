import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {WeatherService} from '../../app/services/weather.service';
import {WeatherPage} from '../weather/weather';

@Component({
  selector: 'settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  metricUnits: boolean;
  // userUnitsMetric: boolean;
  // defaultLocation: any;

  constructor(public navCtrl: NavController, private weatherService:WeatherService) {

  }

  // getQuery(){
  //   this.weatherService.searchCities(this.searchStr)
  //     .subscribe(res => {
  //       this.results = res.RESULTS;
  //     });
  // }

  ngOnInit(){
     this.metricUnits = true;
  }

  // getDefaultLocation(){
  //   if(localStorage.getItem('location') !== undefined && localStorage.getItem('location') !== null){
  //     this.defaultLocation = JSON.parse(localStorage.getItem('location')).name;
  //   } else {
  //     this.defaultLocation = '10001.11.99999';
  //   }
  // }

  // setDefaultLocation(location){
  //   this.results = [];

  //   localStorage.setItem('location', JSON.stringify(location));
  //   this.searchStr = location.name;
  //   this.getDefaultLocation();
  // }

  // saveChanges(){
  //   this.navCtrl.push(WeatherPage);
  // }

}
