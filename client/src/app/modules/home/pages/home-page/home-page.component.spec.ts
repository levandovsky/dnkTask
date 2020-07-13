import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HomePageComponent } from "./home-page.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ActivatedRoute } from "@angular/router";
import { PlatesApiService } from "src/app/core/services/plates-api/plates-api.service";
import { of } from "rxjs";
import { PlateInfoGroupComponent } from "src/app/shared/components/plate-info-group/plate-info-group.component";
import { ReactiveFormsModule } from "@angular/forms";
import { PlateCardComponent } from "../../components/plate-card/plate-card.component";

describe("HomePageComponent", () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  const mockPlate = {
    owner: "test",
    plate: "PLATE",
  };

  beforeEach(async(() => {
    const activatedRoadMock = {
      snapshot: {
        data: {
          plates: [mockPlate],
        },
      },
      data: of({ plates: [mockPlate] }),
    };

    TestBed.configureTestingModule({
      declarations: [
        HomePageComponent,
        PlateInfoGroupComponent,
        PlateCardComponent,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoadMock },
        { provide: PlatesApiService, useValue: { plates$: of([mockPlate]) } },
      ],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
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
    const addSpy = spyOn(component, "showPlateForm");
    const addBtn: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector(
      "#add-button"
    );
    addBtn.click();
    fixture.detectChanges();
    expect(addSpy).toHaveBeenCalled();
  });

  describe("pagination", () => {
    it("should take a slice of original array by default parameters", () => {
      component.plates = [
        ...Array(40).fill({
          owner: "test",
          plate: "test",
        }),
      ];
      component.changePage(2);
      expect(component.currentPage).toBe(2);
      expect(component.startIndex).toBe(25);
      expect(component.endIndex).toBe(50);
    });
  });

  describe("search", () => {
    it("should filter array from observable and return found", () => {
      component.searchControl.setValue("plate");
      component.findPlates();
      expect(component.paginatedPlates.length).toBe(1);
      expect(component.paginatedPlates[0]).toEqual(mockPlate);
    });
  });
});
