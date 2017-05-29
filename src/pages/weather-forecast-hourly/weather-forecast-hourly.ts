import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NavController, ModalController } from 'ionic-angular';

import {WeatherService} from '../../app/services/weather.service';

import { WeatherPage } from '../weather/weather';
import { AutocompletePage } from '../autocomplete/autocomplete';

@Component({
  templateUrl: 'weather-forecast-hourly.html'
})
export class WeatherForecastHourlyPage {
  address: any;
  forecastToday: any;
  forecastWeek: any;
  weather: any;
  currentTime: any;
  currentDate: any;
  updatedDate: any;
  location: any;

  constructor(
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    private weatherService:WeatherService,
    private datePipe: DatePipe
  ) {

    this.address = {
      city: ''
    };

    this.currentDate = {
      day: this.weatherService.getDateFormated('EEEE'),
      date: this.weatherService.getDateFormated('MMMM, d')
    }
console.log(this.currentDate.day)
    this.currentTime = this.weatherService.getDateFormated('hh:mm a');
  }

//   showAddressModal () {
//     let modal = this.modalCtrl.create(AutocompletePage);
//     modal.onDidDismiss(data => {
//       this.address.city = data.description;
//       localStorage.setItem('city', this.address.city);
//       this.chooseLocation(data.place_id)
//     });
//     modal.present();
//   }

//   ngOnInit(){
//     this.getDefaultLocation();
//     setInterval(() => this.currentTime = this.weatherService.getDateFormated('hh:mm a'), 1000*30);
//     setInterval(() => this.getDefaultLocation(), 1000*60*15);
//   }

//   getDefaultLocation(){
//     if(localStorage.getItem('location') !== undefined && localStorage.getItem('location') !== null){
//       this.location = localStorage.getItem('location');
//       this.address.city = localStorage.getItem('city');
//     } else {
//       this.location = '43.65,-79.38';
//       this.address.city = 'Toronto, ON, Canada';
//     }
//     this.updatedDate = this.weatherService.getDateFormated('short');
//     this.weatherService.getCurrentWeather(this.location)
//       .subscribe(weather => {
//         this.weather = weather;
//       });
//     this.weatherService.getForecastWeather(this.location)
//       .subscribe(forecast => {
//         console.log(forecast.Days)
//         this.forecastToday = forecast.Days.shift();
//         this.forecastWeek = forecast.Days;
//         console.log(this.forecastToday)
//       });
//   }

//   chooseLocation(locationId){
//     this.weatherService.searchCities(locationId)
//       .subscribe(details => {
//         this.location = (details.result.geometry.location.lat).toFixed(2) +','+ (details.result.geometry.location.lng).toFixed(2);
//         localStorage.setItem('location', this.location);
//         this.weatherService.getCurrentWeather(this.location)
//           .subscribe(weather => {
//             this.weather = weather;
//             console.log(this.weather)
//           });
//         this.weatherService.getForecastWeather(this.location)
//           .subscribe(forecast => {
//             this.forecastToday = forecast.Days.shift();
//             this.forecastWeek = forecast.Days;
//           });
//       });
//   }

//   showCurrentDetails() {
//     this.navCtrl.push(WeatherForecastPage);
//   }

}
