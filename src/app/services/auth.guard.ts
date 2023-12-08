import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

/**
 * AuthGuard service for route authorization.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private readonly router: Router) {}

  /**
   * Checks if a user is authenticated before allowing access to a route.
   * @param route The activated route snapshot.
   * @param state The router state snapshot.
   * @returns A promise that resolves to true if the user is authenticated; otherwise, it navigates to the login route and resolves to false.
   */
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<boolean> {
    const userId = localStorage.getItem('userId');
    if (userId === '') {
      await this.router.navigate(['/login']);
    }
    return Boolean(userId);
  }
}
