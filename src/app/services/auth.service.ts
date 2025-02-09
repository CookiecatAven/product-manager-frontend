import { Injectable } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { Router } from '@angular/router';

export interface User {
  email: string;
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = null;

  constructor(private router: Router) {
    this.updateCurrentUserFromToken()
  }

  public login(token: string) {
    localStorage.setItem('ACCESS_TOKEN', token);
    this.updateCurrentUserFromToken()
  }

  public logout() {
    localStorage.removeItem('ACCESS_TOKEN');
    this.currentUser = null;
  }

  public isUserLoggedIn() {
    return !!this.currentUser;
  }

  public getUserEmail() {
    return this.currentUser ? this.currentUser.email : null;
  }

  public isUserAdmin() {
    return this.currentUser ? this.currentUser.isAdmin : false;
  }

  private updateCurrentUserFromToken() {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (!token) {
      // Es ist kein Token vorhanden → es kann nichts dekodiert werden
      return;
    }
    try {
      // JWT Token dekodieren
      const decoded: JwtPayload & { roles?: string[], email?: string } = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decoded.exp && decoded.exp < currentTime) {
        // Token ist abgelaufen → Token löschen und dekodieren abbrechen
        this.logout();
        return;
      }

      if (!decoded.email || !Array.isArray(decoded.roles)) {
        // E-Mail oder Rollen fehlen auf dekodiertem Token → Token löschen und abbrechen
        this.logout();
        return;
      }

      // Benutzerinformationen speichern
      this.currentUser = {
        email: decoded.email,
        isAdmin: decoded.roles.includes('admin')
      }
    } catch (error) {
      // Es gab ein Problem beim dekodieren des Tokens → Token löschen
      this.logout();
      return;
    }
  }
}
