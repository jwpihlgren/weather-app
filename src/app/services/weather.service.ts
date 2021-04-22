import { WeatherModel } from '../models/weather.model'
import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { environment } from 'environments/environment'

@Injectable({
    providedIn: 'root',
})
export class WeatherService {
    constructor(private http: HttpClient) {}

    private weatherUrl: string = `https://api.weatherapi.com/v1/forecast.json?key=${environment.WEATHER_API_KEY}&lang=sv&days=3&q=`
    private locationUrl: string = `https://api.weatherapi.com/v1/search.json?key=${environment.WEATHER_API_KEY}&lang=sv&aqi=no&alerts=yes&q=`
    private DEFAULT_LOCATION = 'Partille, Vastra Gotaland, Sweden'

    getWeather(query: string): Observable<WeatherModel> {
        return this.http.get<any>(this.weatherUrl + query).pipe(
            map((res) => {
                const data: WeatherModel = {
                    locationName: res.location.name,
                    currentTempC: res.current.temp_c,
                    minTempC: res.forecast.forecastday[0].day.mintemp_c,
                    maxTempC: res.forecast.forecastday[0].day.maxtemp_c,
                    condition: res.current.condition.text,
                    code: res.current.condition.code,
                    windspeed: res.current.wind_kph,
                    windDirection: res.current.wind_dir,
                    humidity: res.current.humidity,
                    lastUpdated: res.current.last_updated,
                    airPressure: res.current.pressure_mb,
                    forecast: res.forecast.forecastday.map((day) => {
                        const obj = {
                            date: day.date,
                            minTempC: day.day.mintemp_c,
                            maxTempC: day.day.maxtemp_c,
                            iconUrl: day.day.condition.icon,
                        }
                        return obj
                    }),
                }
                return data
            })
        )
    }

    getLocation(query: string): Observable<any> {
        const cleanQuery = this.sanitizeQuery(query)
        const previousSearches = this.getListofMatches(cleanQuery)

        if (previousSearches.length !== 0) {
            console.log('Query was found on localstorage!')
            return of(previousSearches)
        }
        return this.http
            .get<Observable<any[]>>(
                this.locationUrl + (cleanQuery || this.DEFAULT_LOCATION),
                {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json; charset=utf-8',
                    }),
                }
            )
            .pipe(
                tap((data) => {
                    console.log('Query was was sent to API')
                    const storedSearches = this.getStoredSearches()
                    storedSearches[cleanQuery] = data
                    this.setStoredSearches(storedSearches)
                })
            )
    }

    private getListofMatches(query: string): any[] {
        const storedSearches = this.getStoredSearches()
        return storedSearches[query] ? storedSearches[query] : []
    }

    private getStoredSearches(): object {
        if (localStorage.getItem('storedSearches') === null) {
            this.setStoredSearches({})
        }

        const storedSearches = localStorage.getItem('storedSearches')
        const parsedSearches = JSON.parse(storedSearches)

        if (parsedSearches === undefined)
            throw new Error(
                `ParsedSearches should not be undefined: \n ${parsedSearches}`
            )
        return parsedSearches
    }

    private setStoredSearches(obj: object): void {
        localStorage.setItem('storedSearches', JSON.stringify(obj))
    }

    private sanitizeQuery(query: string): string {
        query = query.toLowerCase()
        query = query.replace(/\u00e5/g, 'a')
        query = query.replace(/\u00e4/g, 'a')
        query = query.replace(/\u00f6/g, 'o')
        query = query.replace(/[^A-Za-z -]/g, '')
        return query
    }
}
