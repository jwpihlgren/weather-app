import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { APP_BASE_HREF } from '@angular/common'

import { HttpClientModule } from '@angular/common/http'
import { WeatherContainerComponent } from './components/weather-container/weather-container.component'

import { ReactiveFormsModule } from '@angular/forms'
import { SearchFormComponent } from './components/search-form/search-form.component'
import { ForecastItemComponent } from './components/forecast-item/forecast-item.component'
import { CurrentItemComponent } from './components/current-item/current-item.component'
import { ConvertDegreeUnitPipe } from './pipes/convert-degree-unit'
import { ConvertWindspeedUnitPipe } from './pipes/convert-windspeed-unit.pipe'
/* import { environment} from 'environments/environment.prod' */
import { environment } from 'environments/environment';
import { DatePipe } from './pipes/date.pipe'

@NgModule({
    declarations: [
        AppComponent,
        WeatherContainerComponent,
        SearchFormComponent,
        ForecastItemComponent,
        CurrentItemComponent,
        ConvertDegreeUnitPipe,
        ConvertWindspeedUnitPipe,
        DatePipe,
    ],
    imports: [BrowserModule, HttpClientModule, ReactiveFormsModule],
    providers: [{ provide: APP_BASE_HREF, useValue: environment.BASE_URL }],
    bootstrap: [AppComponent],
})
export class AppModule {}
