import { TestBed, inject } from "@angular/core/testing";

import { PlatesApiResolverService } from "./plates-api-resolver.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { PlatesApiService } from "../../services/plates-api/plates-api.service";
import { of } from "rxjs";
import { Router } from "@angular/router";
import PlateInfo from "src/app/shared/models/PlateInfo";
import { map } from "rxjs/operators";

describe("PlatesApiResolverService", () => {
  let resolver: PlatesApiResolverService;
  const testArray: PlateInfo[] = [{ owner: "test", plate: "test" }];
  const apiMock = {
    plates$: of(testArray),
  };
  const routerMock = {
    navigate: jest.fn(),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: PlatesApiService, useValue: apiMock },
        { provide: Router, useValue: routerMock },
      ],
    });
    resolver = TestBed.get(PlatesApiResolverService);
  });

  it("should be created", () => {
    expect(resolver).toBeTruthy();
  });

  it("should return Observable<PersonalInfo[]> if data is fetched", () => {
    resolver.resolve().subscribe((value) => expect(value).toEqual(testArray));
  });

  it("should navigate to home if value was not resolved", () => {
    TestBed.overrideProvider(PlatesApiService, {
      useValue: { panels$: of(null) },
    });
    const router = TestBed.get(Router);
    const navigateSpy = spyOn(router, "navigate");
    resolver.resolve().subscribe(() => expect(navigateSpy).toHaveBeenCalled());
  });
});
