import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WeathermapService } from './../../services/weathermap.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit { 
  public addressForm: FormGroup;
  public navigateTo: string;
  public WeatherData: any;
  public lat: number = 0;
  public long: number = 0;
  public model: any = {
    country: ""
  }

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private weathermapService: WeathermapService) { }

  ngOnInit(): void {
    this.getCurrentLocation();    
    this.addressForm = this.fb.group({
      country: this.fb.control('', [Validators.required,])
    });
    this.WeatherData = {
      main: {},
      isDay: true
    };

  }

  getWeatherData() {
    let country = this.addressForm.value.country;
    this.weathermapService.getWeatherInput(country).then(result => {      
      this.setWeatherData(this.Weather);
     });  
    // let data = JSON.parse('{"coord":{"lon":72.85,"lat":19.01},"weather":[{"id":721,"main":"Haze","description":"haze","icon":"50n"}],"base":"stations","main":{"temp":297.15,"feels_like":297.4,"temp_min":297.15,"temp_max":297.15,"pressure":1013,"humidity":69},"visibility":3500,"wind":{"speed":3.6,"deg":300},"clouds":{"all":20},"dt":1580141589,"sys":{"type":1,"id":9052,"country":"IN","sunrise":1580089441,"sunset":1580129884},"timezone":19800,"id":1275339,"name":"Mumbai","cod":200}');
    // this.setWeatherData(data);
  }

  setWeatherData(data) {
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);
    console.log(this.WeatherData);
    this.model.country = this.WeatherData.name;

  }

  public async getCurrentLocation() {
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
        console.log('lat and long', this.lat, this.long);
        this.getWeatherDataLocation();
      });
     
    }
    else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  public getWeatherDataLocation() {    
   this.weathermapService.getWeatherDataLocation(this.lat, this.long).then(result => {
    console.log('result', this.Weather);
    this.setWeatherData(this.Weather);
   });  
  }

  public get Weather(){
    return this.weathermapService.getWeatherData;
  }
}
