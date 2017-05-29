import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NavController, ModalController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

import { WeatherService } from '../../app/services/weather.service';

import { WeatherForecastHourlyPage } from '../weather-forecast-hourly/weather-forecast-hourly';
import { WeatherForecastDailyPage } from '../weather-forecast-daily/weather-forecast-daily';
import { AutocompletePage } from '../autocomplete/autocomplete';

@Component({
  selector: 'weather',
  templateUrl: 'weather.html'
})
export class WeatherPage {
  address: any;
  daily: any;
  alerts: any;
  hourly: any;
  minutely: any;
  current: any;
  currentTime: any;
  currentDate: any;
  updatedDate: any;
  forecastDate: any;
  location: any;
  shownGroup: any = null;
  cityPhoto: any;
  cityPhotoUrl: any;

  constructor(
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    private weatherService:WeatherService,
    private datePipe: DatePipe,
    private sanitizer: DomSanitizer
  ) {

    this.address = {
      city: ''
    };

    this.currentDate = {
      day: this.weatherService.getDateFormated('EEEE'),
      date: this.weatherService.getDateFormated('MMMM, d')
    }

    this.currentTime = this.weatherService.getDateFormated('hh:mm a');

    this.forecastDate = (date:any) => {
      return {
        time: this.weatherService.getDateFormated('h a', '', date),
        day: this.weatherService.getDateFormated('EEE','', date),
        month: this.weatherService.getDateFormated('MMM, d','', date),
      }
    }
  }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
        this.shownGroup = null;
    } else {
        this.shownGroup = group;
    }
  };
  isGroupShown(group) {
      return this.shownGroup === group;
  };

  showAddressModal () {
    let modal = this.modalCtrl.create(AutocompletePage);
    modal.onDidDismiss(data => {
      this.address.city = data.description;
      localStorage.setItem('city', this.address.city);
      this.chooseLocation(data.place_id)
    });
    modal.present();
  }

  ngOnInit(){
    this.getDefaultLocation();
    setInterval(() => this.currentTime = this.weatherService.getDateFormated('hh:mm a'), 1000*30);
    setInterval(() => this.getDefaultLocation(), 1000*60*120);
  }


  updatePageContent(location, address){
    this.weatherService.getCurrentWeather(location, address)
      .subscribe(data => {
        this.current = data.currently;
        this.daily = data.daily;
        this.alerts = data.alerts;
        this.hourly = data.hourly;
        this.minutely = data.minutely;
      });

    // let descr = this.current ? this.current.summary : '';
    // this.weatherService.searchCityPhoto(location, address, descr)
    //   .subscribe(data => {
    //     console.log(data)
    //     this.cityPhoto = data.photos.photo[0];
    //     if (this.cityPhoto) {
    //       this.cityPhotoUrl = this.sanitizer.bypassSecurityTrustStyle('url(' + '//farm' + this.cityPhoto.farm + '.staticflickr.com/' + this.cityPhoto.server + '/' + this.cityPhoto.id + '_' + this.cityPhoto.secret + '.jpg)');              
    //       } else {
    //         this.cityPhoto = 'local'; 
    //         this.cityPhotoUrl = this.sanitizer.bypassSecurityTrustStyle('url(' + '/assets/images/bg.jpg)');
    //       }
    //   });   
  }

  getDefaultLocation(){
    if(localStorage.getItem('location') !== undefined && localStorage.getItem('location') !== null){
      this.location = JSON.parse(localStorage.getItem('location'));
      this.address.city = localStorage.getItem('city');
    } else {
      this.location = {
        lat: '43.65',
        long: '-79.38'
      }
      this.address.city = 'Toronto, ON, Canada';
    }
    this.updatedDate = this.weatherService.getDateFormated('short');
    this.updatePageContent(this.location, this.address.city);
  }

  chooseLocation(locationId){
    this.weatherService.searchCities(locationId)
      .subscribe(details => {
        console.log(details)
        this.location = {
          lat: (details.result.geometry.location.lat).toFixed(4),
          long: (details.result.geometry.location.lng).toFixed(4),
          photo: details.result.photos[0].photo_reference
        }
        if (this.location.photo) {
          
            // .then(function(respond){
            //   console.log(respond)
            // })
          // this.cityPhotoUrl = this.sanitizer.bypassSecurityTrustStyle('url(' + 'https://maps.googleapis.com/maps/api/place/photo?photoreference=' + this.location.photo + '&key=AIzaSyBEb5XYZ4ppd33oT8JKoi_30V3pGuT3hlQ');              
        } else {
          this.cityPhoto = 'local'; 
          this.cityPhotoUrl = this.sanitizer.bypassSecurityTrustStyle('url(' + '/assets/images/bg.jpg)');
        }
        this.address.city = details.result.formatted_address;
        localStorage.setItem('location', JSON.stringify(this.location));
        // this.updatePageContent(this.location, this.address.city);
      });
  }

  showForecastHourlyDetails() {
    this.navCtrl.push(WeatherForecastHourlyPage);
  }

  showForecastDailyDetails() {
    this.navCtrl.push(WeatherForecastDailyPage);
  }

}
