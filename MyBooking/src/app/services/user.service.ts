import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movies, User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user_url: string = 'http://localhost:3000/users';
  private user!: User;
  private movie!: Movies;
  constructor(private _httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }

  registerUser(user: User): Observable<any> {
    return this._httpClient.post(this.user_url + "/register", user, this.httpOptions);
  }

  loginUser(user: User): Observable<any> {
    return this._httpClient.post(this.user_url + "/login", user, this.httpOptions)
  }

  getUserByID(id: string): Observable<any> {
    var userId = id
    return this._httpClient.get(this.user_url + "/" + userId);
  }


  setUser(user: User) {
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }


  setMovie(movie: Movies) {
    this.movie = movie;
  }

  getMovie(): Movies {
    return this.movie;
  }


  
}
