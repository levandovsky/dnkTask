import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ModalComponent } from "./modal.component";
import { ModalService } from "./service/modal.service";

let component: ModalComponent;
let fixture: ComponentFixture<ModalComponent>;
let modalService: ModalService;
let element: HTMLDivElement;
let overlay: HTMLDivElement;
let closeBtn: HTMLButtonElement;

beforeEach(async(() => {
  TestBed.configureTestingModule({
    declarations: [ModalComponent],
  }).compileComponents();
}));

beforeEach(async () => {
  fixture = TestBed.createComponent(ModalComponent);
  component = fixture.componentInstance;
  modalService = TestBed.get(ModalService);
  modalService.open = true;
  fixture.detectChanges();
  element = fixture.debugElement.nativeElement as HTMLDivElement;
  overlay = element.querySelector("#overlay") as HTMLDivElement;
  closeBtn = element.querySelector("#close-button") as HTMLButtonElement;
  await fixture.whenStable();
});

describe("ModalComponent", () => {
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

describe("overlay click handler", () => {
  it("should be called when the element is clicked", () => {
    const clickHandler = spyOn(component, "handleClick");
    overlay.click();
    expect(clickHandler).toHaveBeenCalled();
  });

  it("should be hide the modal when close button is pressed", async () => {
    closeBtn.click();
    expect(modalService.open).toBe(false);
  });

  it("should hide modal if closeOnOverlayClick is true and overlay is pressed", () => {
    modalService.closeOnOverlayClick = true;
    overlay.click();
    expect(modalService.open).toBe(false);
  });

  it("should not hide modal if closeOnOverlayClick is false and overlay is clicked", () => {
    modalService.closeOnOverlayClick = false;
    overlay.click();
    expect(modalService.open).toBe(true);
  });
});
