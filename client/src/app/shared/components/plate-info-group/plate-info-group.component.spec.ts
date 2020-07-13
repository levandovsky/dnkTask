import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import {
  PlateInfoGroupComponent,
  PlateInfoGroup,
} from "./plate-info-group.component";
import {
  ReactiveFormsModule,
  FormGroupDirective,
  FormGroup,
  FormBuilder,
} from "@angular/forms";

describe("PlateInfoGroupComponent", () => {
  let component: PlateInfoGroupComponent;
  let fixture: ComponentFixture<PlateInfoGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [PlateInfoGroupComponent],
      providers: [
        {
          provide: FormGroupDirective,
          useValue: { control: PlateInfoGroup(new FormBuilder()) },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlateInfoGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
