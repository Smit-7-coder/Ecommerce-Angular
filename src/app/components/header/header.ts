import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit{
  userName = '';
  router = inject(Router);
  ngOnInit(): void {
      this.userName = localStorage.getItem('userName') || '';
  }

  logout(): void{
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');

    this.router.navigate(['/login']);
  }
}
