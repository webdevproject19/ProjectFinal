export interface Item {
  title: string;
  link: string;

}

export interface IUser {
  id: number;
  username: string;
  password: string;
  first_name: string;
  email: string;
  is_admin: boolean;
}

export interface ILocation {
  id: number;
  name: string;
}

export interface ICinema {
  id: number;
  name: string;
  image_url: string;
  contact: string;
  location: ILocation;
}

export interface IMovie {
  id: number;
  name: string;
  price: number;
  image_url: string;
  cinema: ICinema;
}

export interface IReview {
  id: number;
  text: string;
  user: IUser;
  cinema: ICinema;
}

export interface ITicket {
  id: number;
  movie_name: string;
  count: number;
  user: IUser;
}

export interface IAuthResponse {
  token: string;
  is_admin: boolean;
  name: string;
}
