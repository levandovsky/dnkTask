import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PlateCardComponent } from "./plate-card.component";
import { ModalService } from "src/app/shared/components/modal/service/modal.service";
import { ReactiveFormsModule, FormBuilder, FormGroupDirective } from "@angular/forms";
import { PlatesApiService } from "src/app/core/services/plates-api/plates-api.service";
import { ModalComponent } from "src/app/shared/components/modal/modal.component";
import { of } from "rxjs";
import { PlateInfoGroupComponent } from 'src/app/shared/components/plate-info-group/plate-info-group.component';
import { RouterTestingModule } from '@angular/router/testing';

describe("PlateCardComponent", () => {
  let component: PlateCardComponent;
  let fixture: ComponentFixture<PlateCardComponent>;
  let modalService: ModalService;
  let modalFixure: ComponentFixture<ModalComponent>;
  let element: HTMLDivElement;
  let editBtn: HTMLButtonElement;
  let deleteBtn: HTMLButtonElement;
  let platesApiService: PlatesApiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlateCardComponent, ModalComponent, PlateInfoGroupComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        {
          provide: PlatesApiService,
          useValue: { updatePlateOwner: jest.fn(() => of(true)) },
        }
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlateCardComponent);
    modalFixure = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    component.plateInfo = { owner: "test", plate: "test" };
    modalService = TestBed.get(ModalService);
    platesApiService = TestBed.get(PlatesApiService);
    modalService.open = false;
    element = fixture.debugElement.nativeElement;
    editBtn = element.querySelector("#edit-button");
    deleteBtn = element.querySelector("delete-button");
    fixture.detectChanges();
    modalFixure.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have edit handler that will set modal state to open", () => {
    editBtn.click();
    expect(modalService.open).toBe(true);
  });

  it("should update an owner if save button was pressed", async () => {
    const updateSpy = spyOn(component, "updateOwner");
    let saveBtn: HTMLButtonElement;
    editBtn.click();
    modalFixure.detectChanges();
    saveBtn = modalFixure.nativeElement.querySelector("#save-button");
    saveBtn.click();
    expect(updateSpy).toHaveBeenCalled();
  });

  it("should delete plate from db if the delete button was pressed", () => {
    const deleteSpy = spyOn(component, "deletePlate");
    let deleteBtn: HTMLButtonElement;
    editBtn.click();
    modalFixure.detectChanges();
    deleteBtn = modalFixure.nativeElement.querySelector("#delete-button");
    deleteBtn.click()
    expect(deleteSpy).toHaveBeenCalled()
  });
});
