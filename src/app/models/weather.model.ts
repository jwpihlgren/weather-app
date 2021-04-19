
import { ForecastModel } from 'app/models/forecast.model'
export class WeatherModel{
  locationName: string;
    minTempC: number;
    maxTempC: number;
    currentTempC: number
    condition: string;
    code: number;
    humidity: number;
    windspeed: number;
    windDirection: string;
    airPressure: number;
    lastUpdated: string;
    forecast: ForecastModel[]
  }

