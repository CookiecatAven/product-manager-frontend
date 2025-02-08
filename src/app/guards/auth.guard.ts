import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('ACCESS_TOKEN');

  // Immer Zugriff auf das Dashboard
  if (state.url === '/dashboard') {
    return true;
  }

  // Falls kein Token vorhanden ist → Weiterleitung zur Login-Seite
  if (!token) {
    console.warn('⚠ Kein Token gefunden, Umleitung zur Login-Seite.');
    router.navigate(['/auth/login']);
    return false;
  }

  try {
    // JWT Token dekodieren
    const decoded: JwtPayload & { roles?: string[] } = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);

    // Token ist abgelaufen → Weiterleitung zur Login-Seite
    if (decoded.exp && decoded.exp < currentTime) {
      console.warn('⚠ Token abgelaufen, Umleitung zur Login-Seite.');
      localStorage.removeItem('ACCESS_TOKEN');
      router.navigate(['/auth/login']);
      return false;
    }

    // Prüfen, ob der Benutzer Adminrechte hat
    const isAdmin = decoded.roles?.includes('admin');

    // Falls die Route Adminrechte erfordert, aber der Benutzer kein Admin ist → Weiterleitung
    if (route.data?.['role'] === 'admin' && !isAdmin) {
      console.warn('Keine Admin-Berechtigung, Umleitung zur entsprechenden Liste.');

      // Umleitung je nach Route
      if (state.url.startsWith('/products')) {
        router.navigate(['/products']);
      } else if (state.url.startsWith('/categories')) {
        router.navigate(['/categories']);
      } else {
        router.navigate(['/']);
      }

      return false;
    }

    return true;
  } catch (error) {
    console.error('🚨 Fehler beim Dekodieren des Tokens:', error);
    localStorage.removeItem('ACCESS_TOKEN');
    router.navigate(['/auth/login']);
    return false;
  }
};
