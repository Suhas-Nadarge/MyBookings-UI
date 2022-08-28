import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movies } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { MOVIELIST } from '../movies.constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movieList: Movies[] = MOVIELIST;

  constructor(
    public router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  movieDetails(movie: Movies): void {
    this.userService.setMovie(movie);
    this.router.navigate(['/details']);
  }

}
