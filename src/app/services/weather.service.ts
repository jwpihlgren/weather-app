import { WeatherModel } from '../models/weather.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { observable, Observable, of, pipe, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient,) { }

  private weatherUrl: string = "http://api.weatherapi.com/v1/forecast.json?key=4ef922377fd94497bcd215700210503&q=";
  private locationUrl: string = "http://api.weatherapi.com/v1/search.json?key=4ef922377fd94497bcd215700210503&days=5&aqi=no&alerts=yes&q=";
  private DEFAULT_LOCATION = "Partille, Vastra Gotaland, Sweden";

  getWeather(query: string): Observable<WeatherModel> {
    return this.http.get<WeatherModel>(this.weatherUrl + (query));
  }

  getLocation(query: string): Observable<any>{
    const previousSearches = this.getListofMatches(query.replace(/[^a-zA-Z0-9 -]+/g, ""));

    if ( previousSearches.length !== 0) {
      console.log("Query was found on localstorage!");
      return of(previousSearches);
    }
    return this.http.get<Observable<any[]>>(this.locationUrl + (query || this.DEFAULT_LOCATION))
    .pipe(tap(data => {
      console.log("Query was was sent to API");
      const storedSearches = this.getStoredSearches();
      storedSearches[query] = data;
      this.setStoredSearches(storedSearches);
    }));
  }

  private getListofMatches(query: string): any[]{
    const storedSearches = this.getStoredSearches();
    return storedSearches[query] ? storedSearches[query] : [];
  }

  private getStoredSearches(): object {
    if (localStorage.getItem("storedSearches") === null) {
      this.setStoredSearches({});
    }

    const storedSearches = localStorage.getItem("storedSearches");
    const parsedSearches = JSON.parse(storedSearches);

    if (parsedSearches === undefined) throw new Error(`ParsedSearches should not be undefined: \n ${parsedSearches}`);
    return parsedSearches;
  }

  private setStoredSearches(obj : object): void {
    localStorage.setItem("storedSearches", JSON.stringify(obj));

  }
}
