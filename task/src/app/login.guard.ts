import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {DataService} from './data.service';

@Injectable({providedIn: 'root'})
export class LoginGuard implements CanActivate {

  constructor(
    private dataService: DataService,
    private router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.dataService.isAuthenticated().then(isData => {
      if (isData) {
        return true
      } else {
        this.router.navigate(['/'], {
          queryParams: {
            auth: false

          }
        })
      }
    })
  }
}
