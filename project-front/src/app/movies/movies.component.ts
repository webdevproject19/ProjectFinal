import { Component, OnInit } from '@angular/core';
import { IMovie } from '../shared/models/models';
import { ProviderService } from '../shared/services/provider.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  public cinemaId = '2';

  public isLogged = false;
  public isAdmin = false;

  public movies: IMovie[] = [];

  public count = 1;

  constructor(private provider: ProviderService) { }

  ngOnInit() {
    this.cinemaId = localStorage.getItem('cinemaId');
    this.getMovies();

    const token = localStorage.getItem('token');
    if (token) {
      this.isLogged = true;
      this.isAdmin = (localStorage.getItem('isAdmin') === 'True' ? true : false);
    }
  }

  getMovies() {
    this.provider.getMovies(this.cinemaId).then(res => {
      this.movies = res;
    });
  }

  postTicket(movie: IMovie) {
    if (this.count) {
      this.provider.postTicket(movie.name, this.count).then(res => {
        this.count = 1;
      });
    }
  }

  putMovie(movie: IMovie) {
    this.provider.putMovie(movie).then(res => {

    });
  }

  deleteMovie(movie: IMovie) {
    this.provider.deleteMovie(movie).then(res => {
      this.getMovies();
    });
  }

}
