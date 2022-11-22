import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeathermapService {

  private key_weather = environment.key_weather;
  public weatherData: any;

  constructor() { }


  public getWeatherDataLocation(lat: number, long: number) {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${this.key_weather}`)
      .then(response => response.json())
      .then(data => {        
        this.weatherData = data;              
      });
  }


  public getWeatherInput(country: string) {   
    return  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${this.key_weather}`)
      .then(response => response.json())
      .then(data => { 
        this.weatherData = data;
       });

    // let data = JSON.parse('{"coord":{"lon":72.85,"lat":19.01},"weather":[{"id":721,"main":"Haze","description":"haze","icon":"50n"}],"base":"stations","main":{"temp":297.15,"feels_like":297.4,"temp_min":297.15,"temp_max":297.15,"pressure":1013,"humidity":69},"visibility":3500,"wind":{"speed":3.6,"deg":300},"clouds":{"all":20},"dt":1580141589,"sys":{"type":1,"id":9052,"country":"IN","sunrise":1580089441,"sunset":1580129884},"timezone":19800,"id":1275339,"name":"Mumbai","cod":200}');
    // this.setWeatherData(data);
  }

  get getWeatherData() {
    if (this.weatherData) {
      return this.weatherData;
    }
  }

}
