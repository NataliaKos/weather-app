import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { CacheService, CacheStoragesEnum } from 'ng2-cache/ng2-cache';
import 'rxjs/Rx';


// declare var BUILD_VERSION: string;

@Injectable()
export class WeatherService {
    private observable: Observable<any>;
    private appKey: String;
    private flickrKey: String;
    private appId: String;
    private forecastUrl: String;
    private currentUrl: String;
    private searchUrl: String;
    private searchPhotoUrl: String;
    private searchKey: String;
    private placeId: string;
    private data: any;

    constructor(
        private http:Http,
        private datePipe: DatePipe,
        private cacheService: CacheService
    ) {
        this.http = http;
        // Dark Sky
        ////////////////////////////////////////////////////////////////////////////////////
        this.appKey = '1fa7fe1bd4dbca316aad51caf5d21e42';
        this.currentUrl = '/api';
        this.forecastUrl = '';

        //Open Weather
        ////////////////////////////////////////////////////////////////////////////////////
        // this.appKey = '3e846505d2653afc9a9d4cf29845bb5a';
        // this.currentUrl = '//api.openweathermap.org/data/2.5/weather?';
        // this.forecastUrl = '';

        // Google Places
        ////////////////////////////////////////////////////////////////////////////////////
        this.searchKey = 'AIzaSyBEb5XYZ4ppd33oT8JKoi_30V3pGuT3hlQ';
        this.searchUrl = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=';

        // Flickr appId
        // this.searchPhotoUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&tags=city+center%2C+cityscaper%2C+cityline%2C+center%2C+main&sort=interestingness-asc&accuracy=11&content_type=1&media=photos&has_geo=&geo_context=&format=json&nojsoncallback=1&per_page=1';
        
        // this.searchPhotoUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&content_type=7&parse_tags=1&sort=relevance&accuracy=3&has_geo=true&geo_context=&format=json&nojsoncallback=1&per_page=1';
        
        this.searchPhotoUrl = 'https://api.flickr.com/services/rest?sort=relevance&parse_tags=1&content_type=7&extras=can_comment%2Ccount_comments%2Ccount_faves%2Cdescription%2Cisfavorite%2Clicense%2Cmedia%2Cneeds_interstitial%2Cowner_name%2Cpath_alias%2Crealname%2Crotation%2Curl_c%2Curl_l%2Curl_m%2Curl_n%2Curl_q%2Curl_s%2Curl_sq%2Curl_t%2Curl_z&per_page=25&page=1&viewerNSID=&method=flickr.photos.search&csrf=&format=json&hermes=1&hermesClient=1&reqId=1af28402&nojsoncallback=1';
        this.flickrKey = '014987f9ace4b9c96db1ebad9572b016'

        // Weather Unlocked
        ////////////////////////////////////////////////////////////////////////////////////
        // this.appKey = 'cab8fd125aa6069a766b863fd1b68ebc';
        this.appId = '4b69967e';
        // this.forecastUrl = '//api.weatherunlocked.com/api/forecast/';
        // this.currentUrl = '//api.weatherunlocked.com/api/current/';

        //set global prefix as build version
        this.cacheService.setGlobalPrefix('weather_');

    }

    getForecastWeather(city){
        return this.http.get(this.forecastUrl+city+'?app_id='+this.appId+'&app_key='+this.appKey)
            .map(res => res.json());
    }

    getCurrentWeather(location:any, city: string, units:string = 'ca', lang:string = 'en'){
        let cachedCity: boolean = this.cacheService.exists(city);
        if (cachedCity) {
            let cachedCityData: any|null = this.cacheService.get(city);
            this.data = JSON.parse(cachedCityData);
            console.log('from cache');
            // if `data` is available just return it as `Observable`
            return Observable.of(this.data); 
        } else if (this.observable) {
            console.log('request is in progress');
            // if `this.observable` is set then the request is in progress
            // return the `Observable` for the ongoing request
            return this.observable;
        } else {
            console.log('create the request');
            // example header (not necessary)
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            // headers.append('Accept-Encoding', 'gzip');           
            // create the request, store the `Observable` for subsequent subscribers
            this.observable = this.http.get(this.currentUrl + '/' + this.appKey + '/'  + location.lat + ',' + location.long + '?units=' + units, {
                headers: headers
            })
            .map(response =>  {
                // when the cached data is available we don't need the `Observable` reference anymore
                this.observable = null;

                if(response.status == 400) {
                return "FAILURE";
            } else if(response.status == 200) {
                this.data = response.json();
                //put data to cache for 1 hour (expires - timestamp with milliseconds)
                this.cacheService.set(city, JSON.stringify(this.data), {expires: Date.now() + 1000 * 60 * 60});

                return this.data;
                }
                // make it shared so more than one subscriber can get the result
            })
            .share();
        }
        return this.observable;

        // return this.http.get(this.currentUrl+city+'?app_id='+this.appId+'&app_key='+this.appKey)
        // return this.http.get(this.currentUrl + 'lat=' + lat + '&lon=' + long + '&units=' + units + '&type=accurate' + '&appid=' + this.appKey + '&lang=' + lang )
        // return this.http.get(this.currentUrl + '/' + this.appKey + '/'  + lat + ',' + long + '?units=' + units)        
        //     .map(res => res.json());
    }

    searchCities(placeId){
        return this.http.get(this.searchUrl+placeId+'&key='+this.searchKey)
            .map(res => res.json());
    }

    searchCityPhoto(location, city, descr){
// https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU&key=
        return this.http.get(this.searchPhotoUrl + '&api_key=' + this.flickrKey + '&text='  + 'landscape%2C+cityscape' + '%2C+' + city)
            .map(res => res.json());
    }

    getDateFormated(format: string, date: any = '', utcSeconds: any = '') {
        let newDate;
        if (utcSeconds !== ''){
            var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
            newDate = d.setUTCSeconds(utcSeconds);
        } else if (date !== ''){
          let dateArray = date.split('/');
          [ dateArray[0], dateArray[1], dateArray[2] ] = [ dateArray[2], dateArray[1], dateArray[0] ];
          let dateString = dateArray.join('/');
          newDate = new Date(dateString);
        } else newDate = new Date();
        
        return this.datePipe.transform(newDate, format);
    }
}
