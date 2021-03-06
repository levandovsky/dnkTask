import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  Output,
  EventEmitter,
  OnDestroy,
} from "@angular/core";
import PlateInfo from "src/app/shared/models/PlateInfo";
import { ModalService } from "src/app/shared/components/modal/service/modal.service";
import { FormBuilder } from "@angular/forms";
import { PlatesApiService } from "src/app/core/services/plates-api/plates-api.service";
import { Subscription } from "rxjs";
import { PlateInfoGroup } from "src/app/shared/components/plate-info-group/plate-info-group.component";

@Component({
  selector: "app-plate-card",
  templateUrl: "./plate-card.component.html",
  styleUrls: ["./plate-card.component.scss"],
})
export class PlateCardComponent implements OnInit, OnDestroy {
  @Input() plateInfo: PlateInfo;
  @Output() plateUpdate = new EventEmitter();
  plateInfoGroup = PlateInfoGroup(this.formBuilder, { disablePlate: true });
  edit = false;
  private readonly subscription = new Subscription();

  constructor(
    public modalService: ModalService,
    private platesApi: PlatesApiService,
    private formBuilder: FormBuilder
  ) {
    this.modalService.closeOnOverlayClick = false;
  }

  ngOnInit() {}

  handleEdit(template: TemplateRef<any>) {
    this.plateInfoGroup.patchValue(this.plateInfo);
    this.modalService.showModal(template);
  }

  updateOwner() {
    this.subscription.add(
      this.platesApi
        .updatePlateOwner(this.plateInfoGroup.getRawValue() as PlateInfo)
        .subscribe(
          () => {
            this.plateUpdate.emit();
            this.modalService.hideModal();
          },
          (err) => console.error(err)
        )
    );
  }

  deletePlate() {
    if (confirm("Are you sure you want to delete this plate?")) {
      this.subscription.add(
        this.platesApi.deletePlate(this.plateInfo.plate).subscribe(
          () => {
            this.plateUpdate.emit();
            this.modalService.hideModal();
          },
          (err) => console.error(err)
        )
      );
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
}
