import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(public authService: AuthenticationService) {}

  logout() {
    this.authService.logout();
  }
}
