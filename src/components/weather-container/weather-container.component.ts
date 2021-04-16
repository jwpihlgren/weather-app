
import { Component } from '@angular/core';
import { Observable} from 'rxjs';
import { WeatherService } from '../../app/services/weather.service';
import { BackgroundImageService } from '../../app/services/background-image.service';
import { WeatherModel } from '../../app/models/weather.model';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';


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
  doConvert: boolean = false;
  asMilesPerHour: boolean = false
  forecastDayRange: Array<number> = [1, 2, 3, 4, 5];

  locationList$: Observable<any[]> = new Observable<any[]>();

  searchControl: FormControl = new FormControl('');
  searchHasFocus: boolean = false;

  ngAfterViewInit(): void {
    this.weatherObject$ = this.weatherService.getWeather(this.defaultLocation);

    this.searchControl.valueChanges.pipe(filter(value => value.length >= 3), 
    debounceTime(100), 
    distinctUntilChanged())
    .subscribe(value => {
      this.locationRequest(value);
    });

  }

  onFocus(event: FocusEvent): void {
    this.searchHasFocus = true;
  }

  onBlur(event: FocusEvent): void {
    this.searchHasFocus = false;
  }

  weatherRequest(event): void {  
    event.preventDefault();
    this.locationList$ = new Observable<any[]>();
    this.weatherObject$ = this.weatherService.getWeather(event.target.id + "");
    this.searchControl.setValue("");
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