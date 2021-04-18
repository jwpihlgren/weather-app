import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { WeatherContainerComponent } from './components/weather-container/weather-container.component';
import { AsMetersPerSecondPipe } from './pipes/as-meters-per-second.pipe';
import { AsMilesPerHourPipe } from './pipes/as-miles-per-hour.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { ForecastItemComponent } from './components/forecast-item/forecast-item.component';
import { ConvertDegreeUnitPipe } from './pipes/convert-degree-unit';


@NgModule({
  declarations: [
    AppComponent,
    WeatherContainerComponent,
    AsMetersPerSecondPipe,
    AsMilesPerHourPipe,
    SearchFormComponent,
    ForecastItemComponent,
    ConvertDegreeUnitPipe,
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
