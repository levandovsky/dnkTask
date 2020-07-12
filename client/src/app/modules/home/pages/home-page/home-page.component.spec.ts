import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HomePageComponent } from "./home-page.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ActivatedRoute } from "@angular/router";
import { PlatesApiService } from "src/app/core/services/plates-api/plates-api.service";
import { of } from "rxjs";

describe("HomePageComponent", () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  const mockPlate = {
    owner: "test",
    plate: "plate",
  };

  beforeEach(async(() => {
    const activatedRoadMock = {
      snapshot: {
        data: {
          plates: [mockPlate],
        },
      },
    };
    TestBed.configureTestingModule({
      declarations: [HomePageComponent],
      providers: [
        HttpClientTestingModule,
        { provide: ActivatedRoute, useValue: activatedRoadMock },
        { provide: PlatesApiService, useValue: { plates$: of([mockPlate]) } },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have function to send post request to the server", () => {
    const addSpy = spyOn(component, "addPlate");
    const addBtn: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector(
      "#add-button"
    );
    addBtn.click();
    fixture.detectChanges();
    expect(addSpy).toHaveBeenCalled();
  });
});
