import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})

export class BlockRouteService {

  allowRoute: boolean;

  constructor(private readonly router: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
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
