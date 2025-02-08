import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './pages/elements/header/header/header.component';
import { FooterComponent } from './pages/elements/footer/footer/footer.component';

@Component({
  selector: 'pm-root',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
}
