import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { MatAnchor } from '@angular/material/button';
import { AuthService } from '../../../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'pm-header',
  imports: [
    MatIcon,
    MatToolbar,
    RouterLink,
    MatAnchor,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(protected authService: AuthService) {
  }
}
