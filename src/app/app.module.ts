import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { WeatherContainerComponent } from './weather-container/weather-container.component';
import { AsFahrenheitPipe } from './pipes/as-fahrenheit.pipe';
import { AsMetersPerSecondPipe } from './pipes/as-meters-per-second.pipe';
import { AsMilesPerHourPipe } from './pipes/as-miles-per-hour.pipe';
import { FormsModule } from '@angular/forms';
import { DataPointTwoLineComponent } from './data-point-two-line/data-point-two-line.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherContainerComponent,
    AsFahrenheitPipe,
    AsMetersPerSecondPipe,
    AsMilesPerHourPipe,
    DataPointTwoLineComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
