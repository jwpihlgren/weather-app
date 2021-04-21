import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackgroundImageService {

  getBackgroundUrl(code: number):string {
    console.log("call");
    return `./assets/images/weather-states/${this.codes[`${code}`]}-${this.getTimeofDay()}`;
  }

  private getTimeofDay(){
    
    let currentHour = new Date(Date.now()).getHours();
    if (currentHour > 5 && currentHour < 10) return "morning";
    if (currentHour > 18 || currentHour < 6) return "night";
    return ("day")
  }

  private codes = {
    "1000" :	"clear",
    "1003" :	"light-cloud",
    "1006" :	"heavy-cloud",
    "1009" :	"heavy-cloud",
    "1030" :	"heavy-cloud",
    "1063" :	"showers",
    "1066" :	"sleet",
    "1069" :	"sleet",
    "1072" :	"snow",
    "1087" :	"snow",
    "1114" :	"snow",
    "1117" :	"snow",
    "1135" :	"light-rain",
    "1147" :	"light-rain",
    "1150" :	"light-rain",
    "1153" :	"light-rain",
    "1168" :	"light-rain",
    "1171" :	"heavy-rain",
    "1180" :	"light-rain",
    "1183" :	"light-rain",
    "1186" :	"heavy-rain",
    "1189" :	"heavy-rain",
    "1192" :	"heavy-rain",
    "1195" :	"heavy-rain",
    "1198" :	"light-rain",
    "1201" :	"heavy-rain",
    "1204" :	"sleet",
    "1207" :	"sleet",
    "1210" :	"snow",
    "1213" :	"snow",
    "1216" :	"snow",
    "1219" :	"snow",
    "1222" :	"snow",
    "1225" :	"snow",
    "1237" :	"snow",
    "1240" :	"light-rain",
    "1243" :	"heavy-rain",
    "1246" :	"heavy-rain",
    "1249" :	"sleet",
    "1252" :	"sleet",
    "1255" :	"snow",
    "1258" :	"snow",
    "1261" :	"snow",
    "1264" :	"snow",
    "1273" :	"thunderstorm",
    "1276" :	"thunderstorm",
    "1279" :	"thunderstorm",
    "1282" :	"thunderstorm",
  }
}
