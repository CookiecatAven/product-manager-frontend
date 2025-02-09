import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'pm-go-back-link',
  standalone: true,
  imports: [
    MatButton,
    MatIcon
  ],
  templateUrl: './go-back-link.component.html',
})
export class GoBackLinkComponent {

  goBack(): void {
    window.history.back();
  }
}
