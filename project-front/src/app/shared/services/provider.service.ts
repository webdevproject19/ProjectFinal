import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { HttpClient } from '@angular/common/http';
import { IAuthResponse, ILocation, ICinema, IMovie, ITicket, IReview } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {

  constructor(http: HttpClient) {
    super(http);
  }

  getLocations(): Promise<ILocation[]> {
    return this.get('http://localhost:8000/api/locations/', {});
  }

  getCinemas(locationId: number): Promise<ICinema[]> {
    return this.get(`http://localhost:8000/api/locations/${locationId}/cinemas/`, {});
  }

  postCinema(locationId: number, nName: any, nImageUrl: any, nContact: any): Promise<ICinema> {
    return this.post(`http://localhost:8000/api/locations/${locationId}/cinemas/`, {
      name: nName,
      imageUrl: nImageUrl,
      contact: nContact
    });
  }

  getCinema(cinemaId: string): Promise<ICinema> {
    return this.get(`http://localhost:8000/api/cinemas/${cinemaId}/`, {});
  }

  putCinema(cinema: ICinema): Promise<ICinema> {
    return this.put(`http://localhost:8000/api/cinemas/${cinema.id}/`, {
      name: cinema.name,
      imageUrl: cinema.image_url,
      contact: cinema.contact
    });
  }

  deleteCinema(cinema: ICinema): Promise<any> {
    return this.delete(`http://localhost:8000/api/cinemas/${cinema.id}/`, {});
  }

  getMovies(cinemaId: string): Promise<IMovie[]> {
    return this.get(`http://localhost:8000/api/cinemas/${cinemaId}/movies/`, {});
  }

  postMovie(cinema: IMovie, nName: any, nPrice: number, nImageUrl: any ): Promise<IMovie> {
    return this.post(`http://localhost:8000/api/cinemas/${cinema.id}/movies/`, {
      name: nName,
      imageUrl: nImageUrl,
      price: nPrice
    });
  }

  putMovie(movie: IMovie): Promise<IMovie> {
    return this.put(`http://localhost:8000/api/movies/${movie.id}/`, {
      name: movie.name,
      imageUrl: movie.image_url,
      price: movie.price
    });
  }

  deleteMovie(movie: IMovie): Promise<any> {
    return this.delete(`http://localhost:8000/api/movies/${movie.id}/`, {});
  }

  getReviews(cinemaId: string): Promise<IReview[]> {
    return this.get(`http://localhost:8000/api/cinemas/${cinemaId}/reviews/`, {});
  }

  postReview(cinema: ICinema, nText: any): Promise<IReview> {
    return this.post(`http://localhost:8000/api/cinemas/${cinema.id}/reviews/`,{
      text: nText
    });
  }

  getTickets(): Promise<ITicket[]> {
    return this.get('http://localhost:8000/api/tickets/',{});
  }

  postTicket(nMoviename: any, nCount: number): Promise<ITicket> {
    return this.post('http://localhost:8000/api/tickets/', {
      movie_name: nMoviename,
      count: nCount
    });
  }

  putTicket(ticket: ITicket): Promise<ITicket> {
    return this.put(`http://localhost:8000/api/tickets/${ticket.id}/`,{
      movie_name: ticket.movie_name,
      count: ticket.count
    });
  }

  deleteTicket(ticket: ITicket): Promise<any> {
    return this.delete(`http://localhost:8000/api/tickets/${ticket.id}/`,{});
  }

  deleteTickets(): Promise<any>{
    return this.delete('http://localhost:8000/api/clear/', {});
  }

  auth(login: any, pass: any): Promise<IAuthResponse> {
    return this.post('http://localhost:8000/api/login/', {
      username: login,
      password: pass
    });
  }

  logout(): Promise<any> {
    return this.post('http://localhost:8000/api/logout/', {});
  }

  register(login: any, pass: any, name: any, nEmail: any): Promise<IAuthResponse> {
    return this.post('http://localhost:8000/api/register/', {
      username: login,
      password: pass,
      first_name: name,
      email: nEmail
    });
  }
}
