import { Component } from '@angular/core';

import { WeatherPage } from '../weather/weather';
import { NewsPage } from '../news/news';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = WeatherPage;
  tab2Root: any = NewsPage;
  tab3Root: any = SettingsPage;

  constructor() {

  }
}
