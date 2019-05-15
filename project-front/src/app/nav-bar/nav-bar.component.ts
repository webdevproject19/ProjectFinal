import { Component, OnInit } from '@angular/core';
import { ILocation, ICinema } from '../shared/models/models';
import { ProviderService } from '../shared/services/provider.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  public locations: ILocation[] = [];
  public location1: ICinema[] = [];
  public location2: ICinema[] = [];
  public location3: ICinema[] = [];

  constructor(private provider: ProviderService) { }

  ngOnInit() {
    this.getLocations();
    this.get();
  }

  getLocations() {
    this.provider.getLocations().then(res => {
      this.locations = res;
    });
  }

  get() {
    this.provider.getCinemas(1).then(res => {
      this.location1 = res;
    });
    this.provider.getCinemas(2).then(res => {
      this.location2 = res;
    });
    this.provider.getCinemas(3).then(res => {
      this.location3 = res;
    });
  }

  sendCinemaId(cinema: ICinema) {
    localStorage.setItem('cinemaId', cinema.id.toString());
  }
}
