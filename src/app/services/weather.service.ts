import { WeatherModel } from '../models/weather.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { observable, Observable, of, pipe, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  private weatherUrl: string = `http://api.weatherapi.com/v1/forecast.json?key=${environment.WEATHER_API_KEY}&lang=sv&days=3&q=`;
  private locationUrl: string = `http://api.weatherapi.com/v1/search.json?key=${environment.WEATHER_API_KEY}&lang=sv&aqi=no&alerts=yes&q=`;
  private DEFAULT_LOCATION = "Partille, Vastra Gotaland, Sweden";

  getWeather(query: string): Observable<WeatherModel> {
    return this.http.get<WeatherModel>(this.weatherUrl + (query))/* .pipe(tap(data => console.log(data))); */
  }

  getLocation(query: string): Observable<any>{
    const previousSearches = this.getListofMatches(this.sanitizeQuery(query));

    if ( previousSearches.length !== 0) {
      console.log("Query was found on localstorage!");
      return of(previousSearches);
    }
    return this.http.get<Observable<any[]>>(this.locationUrl + (query || this.DEFAULT_LOCATION), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })

    })
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

  private sanitizeQuery(query: string): string {

    query = query.toLowerCase();
    query = query.replace(/\u00e5/g, "a");
    query = query.replace(/\u00e4/g, "a");
    query = query.replace(/\u00f6/g, "o");
    query = query.replace(/[^A-Za-z -]/g, "");
    return query;
  }
}
