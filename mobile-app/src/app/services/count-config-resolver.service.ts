import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { CountService } from './count.service';
import { GenericResponse } from '../models/GenericResponse';

@Injectable({
  providedIn: 'root'
})
// tslint:disable-next-line: max-line-length
export class CountConfigResolverService implements Resolve<GenericResponse> {
  constructor(private countService: CountService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GenericResponse> | Observable<never> {
    return this.countService.getCountConfigData().pipe(
      take(1),
      mergeMap(data => {
        if (data) {
          return of(data);
        } else {
          this.router.navigate(['/count-before']);
          return EMPTY;
        }
      })
    );
  }
}
