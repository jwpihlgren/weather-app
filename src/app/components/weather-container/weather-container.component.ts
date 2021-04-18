
import { Component } from '@angular/core';
import { Observable} from 'rxjs';
import { WeatherService } from 'app/services/weather.service';
import { BackgroundImageService } from 'app/services/background-image.service';
import { WeatherModel } from 'app/models/weather.model';
import { AfterViewInit } from '@angular/core';
import { DegreeUnit } from 'app/enums/degree-units/degree-units.enum';
import { TemperatureUnit } from 'app/enums/degree-units/temperature-unit-enum';



@Component({
  selector: 'app-weather-container',
  templateUrl: './weather-container.component.html',
  styleUrls: ['./weather-container.component.css']
})
export class WeatherContainerComponent implements AfterViewInit{

  constructor(
    private weatherService: WeatherService, 
    private backgroundImageService: BackgroundImageService) { }

  weatherObject$: Observable<WeatherModel>;
  defaultLocation: string = "Partille, Vastra Gotaland, Sweden";
  degreeUnit: DegreeUnit = DegreeUnit.celcius;
  temperatureUnit: TemperatureUnit = TemperatureUnit.mps;
  forecastDayRange: Array<number> = [1, 2, 3];

  locationList$: Observable<any[]> = new Observable<any[]>();

  searchHasFocus: boolean = false;

  ngAfterViewInit(): void {
    this.weatherObject$ = this.weatherService.getWeather(this.defaultLocation);
  }

  onFocus(event: FocusEvent): void {
    if(event.type === 'focus') this.searchHasFocus = true;
    else if(event.type === 'blur') this.searchHasFocus = false;
    else console.log("Wrong event type");
  }


  weatherRequest(event): void {  
    event.preventDefault();
    this.locationList$ = new Observable<any[]>();
    this.weatherObject$ = this.weatherService.getWeather(event.target.id + "");
  }

  locationRequest(criterion: string): void {
    console.log(criterion);
        if (criterion.length > 3) {
          this.locationList$ = this.weatherService.getLocation(criterion);
        }
        else this.locationList$ = new Observable<any[]>();
  }

  getBackgroundUrl(code: number): string{
    return `url(${this.backgroundImageService.getBackgroundUrl(code || 1000)}.jpg)`
  }

}
