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
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.blockRoutes();
  }

  allowingRoute(allowRoute) {
    this.allowRoute = allowRoute;
  }

  blockRoutes(): boolean {
    if (this.allowRoute) {
      return true;
    } else {
      this.router.navigate(["/"]);
      return false;
    }
  }
  
}
