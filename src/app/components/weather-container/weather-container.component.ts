
import { Component, ElementRef, ViewChild, ViewChildren } from '@angular/core';
import { Observable} from 'rxjs';
import { WeatherService } from 'app/services/weather.service';
import { BackgroundImageService } from 'app/services/background-image.service';
import { WeatherModel } from 'app/models/weather.model';
import { AfterViewInit } from '@angular/core';
import { DegreeUnit } from 'app/enums/degree-units.enum';
import { WindspeedUnit } from 'app/enums/windspeed-units.enum';
import { CurrentItemComponent } from '../current-item/current-item.component';



@Component({
  selector: 'app-weather-container',
  templateUrl: './weather-container.component.html',
  styleUrls: ['./weather-container.component.css']
})
export class WeatherContainerComponent implements AfterViewInit{

  constructor(
    private weatherService: WeatherService, 
    private backgroundImageService: BackgroundImageService,
    private rootElementRef: ElementRef
  ) { }


  /* The units to display numeric values with */
  units = {
    degreeUnit:  DegreeUnit.celcius,
    windspeedUnit : WindspeedUnit.mps
  }

  /* Array to use to render forecast items until we get a reponse*/
  forecastDayRange: Array<number> = [1, 2, 3];

  weatherObject$: Observable<WeatherModel>;
  defaultLocation: string = "Partille, Vastra Gotaland, Sweden";

  locationList$: Observable<string[]> = new Observable<string[]>();
  searchHasFocus: boolean = false;


  ngAfterViewInit(): void {
    this.weatherObject$ = this.weatherService.getWeather(this.defaultLocation);
  }

  onFocus(event: FocusEvent): void {
    console.log("Focus to root")
    if(event.type === 'focus') this.searchHasFocus = true;
    else if(event.type === 'blur') this.searchHasFocus = false;
    else console.log("Wrong event type");
  }


  weatherRequest(event): void {  
    this.locationList$ = new Observable<string[]>();
    this.weatherObject$ = this.weatherService.getWeather(event.target.id + "");
    if(this.rootElementRef) this.rootElementRef.nativeElement.focus();
  }

  locationRequest(criterion: string): void {
        if (criterion.length > 3) {
          this.locationList$ = this.weatherService.getLocation(criterion);
        }
        else this.locationList$ = new Observable<string[]>();
  }

  getBackgroundUrl(code: number): string{
    return `url(${this.backgroundImageService.getBackgroundUrl(code || 1000)}.jpg)`
  }

}
