import { TestBed, getTestBed } from "@angular/core/testing";

import { PlatesApiService } from "./plates-api.service";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import PlateInfo from "src/app/shared/models/PlateInfo";

describe("PlatesApiService", () => {
  let httpMock: HttpTestingController;
  let service: PlatesApiService;
  let injector: TestBed;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PlatesApiService],
    });
    injector = getTestBed();
    service = injector.get(PlatesApiService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("plates$", () => {
    it("Should be an Observable<PlateInfo[]>", () => {
      const testPlates: PlateInfo[] = [
        {
          owner: "Test",
          plate: "Test",
        },
      ];

      service.plates$.subscribe((value) => {
        expect(value.length).toBe(2);
        expect(value).toEqual(testPlates);
      });

      const req = httpMock.expectOne("/api/plates");
      expect(req.request.method).toBe("GET");
      req.flush(testPlates);
    });
  });

  describe("updatePlateOwner", () => {
    it("should call a patch method with body of type {owner: string}", () => {
      const testBody: PlateInfo = {
        plate: "test",
        owner: "test",
      };
      const sub = service.updatePlateOwner(testBody).subscribe();
      const req = httpMock.expectOne("/api/plate/test");
      expect(req.request.method).toBe("PATCH");
      expect(req.request.body).toEqual({ owner: testBody.owner });
      sub.unsubscribe();
    });
  });

  describe("deletePlate", () => {
    it("should send delete request to the backend with plate number as a param", () => {
      const sub = service.deletePlate("test").subscribe();
      const req = httpMock.expectOne("/api/plate/test");
      expect(req.request.method).toBe("DELETE");
      sub.unsubscribe();
    });
  });
});
