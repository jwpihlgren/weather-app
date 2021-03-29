
import { Component, OnDestroy, OnInit, ViewChild, NgModule, Testability } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { WeatherService } from '../services/weather.service';
import { BackgroundImageService } from '../services/background-image.service';
import { WeatherModel } from '../models/weather.model';
import { ElementRef } from '@angular/core';
import { debounceTime, distinctUntilChanged, startWith, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-weather-container',
  templateUrl: './weather-container.component.html',
  styleUrls: ['./weather-container.component.css']
})
export class WeatherContainerComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private weatherService: WeatherService, private backgroundImageService: BackgroundImageService) { }

  weatherObject$: Observable<WeatherModel>;
  defaultLocation: string = "Partille, Vastra Gotaland, Sweden";
  doConvert: boolean = false;
  asMilesPerHour: boolean = false
  forecastDayRange: Array<number> = [1, 2, 3, 4, 5];

  locationList$: Observable<any[]> = new Observable<any[]>();

  @ViewChild('searchInput') 
  input: ElementRef<HTMLInputElement>;

  private subscription: Subscription;

  ngOnInit(): void {
      this.weatherObject$ = this.weatherService.getWeather(this.defaultLocation);
    
  }

  ngAfterViewInit(): void {
    const terms$ = fromEvent<any>(this.input.nativeElement, 'keyup')
    .pipe(map((event) => event.target.value),
    startWith(''),
    debounceTime(400),
    distinctUntilChanged())
    this.subscription = terms$.subscribe(criterieon => {
      this.locationRequest(criterieon);
    });
  }

  weatherRequest(event): void {  
    event.preventDefault();
    this.input.nativeElement.value = "";
    this.locationList$ = new Observable<any[]>();
    this.weatherObject$ = this.weatherService.getWeather(event.target.id + "");
  }

  locationRequest(criterion: string): void {
        if (criterion.length > 3) {
          this.locationList$ = this.weatherService.getLocation(criterion)
        };
  }

  getBackgroundUrl(object: any): string{
    const epoch= object.location.localtime_epoch;
    const weatherType = object.current.condition.code;
    return 'url(' + this.backgroundImageService.getBackgroundUrl(weatherType, epoch) +'.jpg)';
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
