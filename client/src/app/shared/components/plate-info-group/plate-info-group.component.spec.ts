import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlateInfoGroupComponent } from './plate-info-group.component';

describe('PlateInfoGroupComponent', () => {
  let component: PlateInfoGroupComponent;
  let fixture: ComponentFixture<PlateInfoGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlateInfoGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlateInfoGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
