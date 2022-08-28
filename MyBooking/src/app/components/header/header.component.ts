import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogged!: boolean;

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  isLoggedIn(){ 
    console.log(localStorage.getItem('email'));
    if(localStorage.getItem('email')){
      return true;
    } else {
      return false;
    }
  }

  logout(){
    localStorage.clear()

    this.router.navigate([''])
  }

}
