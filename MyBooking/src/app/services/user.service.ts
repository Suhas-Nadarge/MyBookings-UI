import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user_url: string = 'https://localhost:3000/users';
  private user!: User;
  constructor(private _httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }

  getUserByID(id: string): Observable<any> {
    var userId = id
    return this._httpClient.get(this.user_url + "/" + userId);
  }

  getStaffAppointmentByID(id: string): Observable<any> {
    var staffId = id
    return this._httpClient.get(this.user_url + "/staff?staffid=" + staffId);
  }

  setUser(user: User) {
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }

  updateUser(user: User): Observable<any> {
    return this._httpClient.post(this.user_url + "/updateUser", user, this.httpOptions);
  }

  registerUser(user: User): Observable<any> {
    return this._httpClient.post(this.user_url+ "/register", user, this.httpOptions);
  }

  loginUser(user: User): Observable<any> {
    return this._httpClient.post(this.user_url + "/login", user, this.httpOptions)
  }

  // getAppointments(company: ICompany): Observable<IAppointmentDto[]> {
  //   return this._httpClient.post<IAppointmentDto[]>(this.user_url + "/appointment", company, this.httpOptions)
  // }

  // updateAppointment(appointment: IAppointment): Observable<IAppointment> {
  //   return this._httpClient.post<IAppointment>(this.user_url + "/update", appointment, this.httpOptions)
  // }

  // cancelAppointment(appointment:IAppointment):Observable<IAppointment>{
  //   return this._httpClient.post<IAppointment>(this.user_url + "/cancel", appointment, this.httpOptions)
  // }

  // addRatingAppointment(appointment:IAppointment):Observable<IAppointment>{
  //   return this._httpClient.post<IAppointment>(this.user_url + "/rate", appointment, this.httpOptions)
  // }

}
