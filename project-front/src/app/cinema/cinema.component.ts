import { Component, OnInit } from '@angular/core';
import { ICinema, IReview } from '../shared/models/models';
import { ProviderService } from '../shared/services/provider.service';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.scss']
})
export class CinemaComponent implements OnInit {

  public cinemaId = '2';
  public cinema: ICinema;

  public isLogged = false;
  public isAdmin = false;

  public reviews: IReview[] = [];
  public text = '';

  constructor(private provider: ProviderService) { }

  ngOnInit() {
    this.cinemaId = localStorage.getItem('cinemaId');
    this.getCinema();

    this.getReviews();

    const token = localStorage.getItem('token');
    if (token) {
      this.isLogged = true;
      this.isAdmin = (localStorage.getItem('isAdmin') === 'True' ? true : false);
    }
  }

  getCinema() {
    this.provider.getCinema(this.cinemaId).then(res => {
      this.cinema = res;
    });
  }

  getReviews() {
    this.provider.getReviews(this.cinemaId).then(res => {
      this.reviews = res;
    });
  }

  sendReview() {
    if (this.isLogged && this.text) {
      this.provider.postReview(this.cinema, this.text).then(res => {
        this.text = '';
        this.reviews.push(res);
      });
    }
  }

}
