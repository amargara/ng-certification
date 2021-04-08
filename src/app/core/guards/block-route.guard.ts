import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlockRouteGuard implements CanActivate {
  allowRoute: boolean;

  constructor(private readonly router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    return this.blockRoutes();
  }

  public canGoToRoute(allowRoute): void {
    this.allowRoute = allowRoute;
  }

  private blockRoutes(): boolean | UrlTree {
    if (this.allowRoute) {
      return true;
    } else {
      return this.router.createUrlTree(['/']);
    }
  }
  
}
