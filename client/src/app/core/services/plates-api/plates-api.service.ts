import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { shareReplay, tap, take, catchError } from "rxjs/operators";
import PlateInfo from "src/app/shared/models/PlateInfo";
import { throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PlatesApiService {
  constructor(private http: HttpClient) {}
  readonly plates$ = this.http.get<PlateInfo[]>("/api/plates").pipe(take(1));

  updatePlateOwner(newPlateData: PlateInfo) {
    return this.http
      .patch(`/api/plate/${newPlateData.plate}`, { owner: newPlateData.owner })
      .pipe(
        take(1),
        catchError((err) => throwError(err))
      );
  }

  deletePlate(plateNumber: string) {
    return this.http.delete(`/api/plate/${plateNumber}`).pipe(
      take(1),
      catchError((err) => throwError(err))
    );
  }

  addPlate(plate: PlateInfo) {
    return this.http.post("/api/plates", plate).pipe(
      take(1),
      catchError((err) => throwError(err))
    );
  }
}
