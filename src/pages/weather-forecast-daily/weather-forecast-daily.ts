import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NavController } from 'ionic-angular';

import {WeatherService} from '../../app/services/weather.service';

import { WeatherPage } from '../weather/weather';

@Component({
  templateUrl: 'weather-forecast-daily.html'
})
export class WeatherForecastDailyPage {
  
    lineChartData: any;
    lineChartLabels: any;
    daily: any;
    location: any;
    address: any;
    temp: any = [];
    weekDay: any = [];

    constructor(
      public navCtrl: NavController,
      private weatherService: WeatherService
    ) {
      this.getChartData();
      this.lineChartData = [
        {data: this.temp.max, label: 'Max Temp'},
        {data: this.temp.min, label: 'Min Temp'}
      ];
      this.lineChartLabels = this.weekDay;
      console.log(this.lineChartData)
  
    }

    getChartData(){
      let minTemp: any = [], maxTemp: any = [], weekDay: any = [];

      this.location = JSON.parse(localStorage.getItem('location'));
      this.address = {
        city: localStorage.getItem('city')
      };
      this.weatherService.getCurrentWeather(this.location, this.address.city)
        .subscribe(data => {
          console.log(data);
          this.daily = data.daily.data;
        });
      (this.daily).forEach(day => {
        maxTemp.push(day.temperatureMax.toFixed(0));
        minTemp.push(day.temperatureMin.toFixed(0));
        weekDay.push(this.weatherService.getDateFormated('EEE','', day.time))
      })
      this.temp = {
        min: minTemp,
        max: maxTemp
      }
      this.weekDay = weekDay;
      console.log(this.temp)
    }


}
