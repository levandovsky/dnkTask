import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from "@angular/forms";
export function PlateInfoGroup(
  formBuilder: FormBuilder,
  config?: { disablePlate: boolean }
) {
  return formBuilder.group({
    plate: [
      { value: null, disabled: config && config.disablePlate ? true : false },
      [Validators.required, Validators.pattern("([A-Z]{3})([0-9]{3})")],
    ],
    owner: [null, Validators.required],
  });
}
@Component({
  selector: "app-plate-info-group",
  templateUrl: "./plate-info-group.component.html",
  styleUrls: ["./plate-info-group.component.scss"],
})
export class PlateInfoGroupComponent implements OnInit {
  plateInfoGroup: FormGroup;
  @Input() showDelete?: boolean;
  @Output() update = new EventEmitter();
  @Output() delete = new EventEmitter();
  constructor(private formGroupDirective: FormGroupDirective) {}

  ngOnInit() {
    this.plateInfoGroup = this.formGroupDirective.control as FormGroup;
  }

  updateOwner() {
    this.update.emit();
  }

  deletePlate() {
    this.delete.emit();
  }
}
