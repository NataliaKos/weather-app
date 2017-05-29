import { NgModule, ErrorHandler } from '@angular/core';
import { DatePipe } from '@angular/common';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { ChartsModule } from 'ng2-charts';
import { CacheService, CacheStoragesEnum } from 'ng2-cache/ng2-cache';

import { MyApp } from './app.component';
import { WeatherPage } from '../pages/weather/weather';
import { WeatherForecastHourlyPage } from '../pages/weather-forecast-hourly/weather-forecast-hourly';
import { WeatherForecastDailyPage } from '../pages/weather-forecast-daily/weather-forecast-daily';
import { SettingsPage } from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';
import { NewsPage } from '../pages/news/news';
import { AutocompletePage } from '../pages/autocomplete/autocomplete';
import { LineChartComponent } from '../pages/lineChart/lineChart';

@NgModule({
  declarations: [
    MyApp,
    WeatherPage,
    WeatherForecastHourlyPage,
    WeatherForecastDailyPage,
    SettingsPage,
    TabsPage,
    NewsPage,
    AutocompletePage,
    LineChartComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WeatherPage,
    WeatherForecastHourlyPage,
    WeatherForecastDailyPage,
    SettingsPage,
    TabsPage,
    NewsPage,
    AutocompletePage
  ],
  providers: [CacheService, DatePipe, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
