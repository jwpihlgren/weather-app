import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { WeatherContainerComponent } from '../components/weather-container/weather-container.component';
import { AsFahrenheitPipe } from './pipes/as-fahrenheit.pipe';
import { AsMetersPerSecondPipe } from './pipes/as-meters-per-second.pipe';
import { AsMilesPerHourPipe } from './pipes/as-miles-per-hour.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchFormComponent } from '../components/search-form/search-form.component';


@NgModule({
  declarations: [
    AppComponent,
    WeatherContainerComponent,
    AsFahrenheitPipe,
    AsMetersPerSecondPipe,
    AsMilesPerHourPipe,
    SearchFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
