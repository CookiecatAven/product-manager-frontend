import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatAnchor } from '@angular/material/button';

@Component({
  selector: 'pm-footer',
  imports: [
    MatToolbar,
    MatAnchor
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
