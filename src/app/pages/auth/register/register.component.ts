import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Registrierung</h2>
    <form>
      <label for="email">E-Mail</label>
      <input type="email" id="email" placeholder="Deine E-Mail">

      <label for="password">Passwort</label>
      <input type="password" id="password" placeholder="Dein Passwort">

      <button type="submit">Registrieren</button>
    </form>
  `,
  styles: [`h2 { color: green; }`]
})
export class RegisterComponent {}
