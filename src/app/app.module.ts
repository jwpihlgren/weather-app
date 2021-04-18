import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { WeatherContainerComponent } from './components/weather-container/weather-container.component';

import { ReactiveFormsModule } from '@angular/forms';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { ForecastItemComponent } from './components/forecast-item/forecast-item.component';
import { ConvertDegreeUnitPipe } from './pipes/convert-degree-unit';
import { ConvertWindspeedUnitPipe } from './pipes/convert-windspeed-unit.pipe';


@NgModule({
  declarations: [
    AppComponent,
    WeatherContainerComponent,
    SearchFormComponent,
    ForecastItemComponent,
    ConvertDegreeUnitPipe,
    ConvertWindspeedUnitPipe,
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
