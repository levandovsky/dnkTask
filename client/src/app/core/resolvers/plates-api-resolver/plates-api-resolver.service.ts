import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import PlateInfo from "src/app/shared/models/PlateInfo";
import { Observable, of, EMPTY } from "rxjs";
import { PlatesApiService } from "../../services/plates-api/plates-api.service";
import { take, mergeMap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PlatesApiResolverService
  implements Resolve<Observable<PlateInfo[]>> {
  constructor(private plateApi: PlatesApiService, private router: Router) {}
  resolve(): Observable<PlateInfo[] | never> {
    return this.plateApi.plates$.pipe(
      take(1),
      mergeMap((plates) => {
        if (plates) {
          return of(plates);
        } else {
          this.router.navigate(["/home"]);
          return EMPTY;
        }
      })
    );
  }
}
