import { Component, OnInit, TemplateRef } from "@angular/core";
import { PlatesApiService } from "src/app/core/services/plates-api/plates-api.service";
import PlateInfo from "src/app/shared/models/PlateInfo";
import { ActivatedRoute } from "@angular/router";
import { ModalService } from "src/app/shared/components/modal/service/modal.service";
import { FormBuilder } from "@angular/forms";
import { PlateInfoGroup } from "src/app/shared/components/plate-info-group/plate-info-group.component";
import { finalize, filter, map } from "rxjs/operators";
import { Subscription } from "rxjs";
@Component({
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent {
  plates: PlateInfo[];
  paginatedPlates: PlateInfo[];
  itemsPerPage = 25;
  startIndex = 0;
  endIndex = this.itemsPerPage;
  currentPage = 1;
  private readonly subscription = new Subscription();

  addGroup = PlateInfoGroup(this.formBuilder);
  searchControl = this.formBuilder.control(null);

  constructor(
    private route: ActivatedRoute,
    private platesApi: PlatesApiService,
    private modalService: ModalService,
    private formBuilder: FormBuilder
  ) {
    this.subscription.add(
      this.route.data.subscribe((data) => {
        this.plates = data.plates;
        this.changePage(1);
      })
    );
  }

  paginatePlates() {
    this.paginatedPlates = [...this.plates].slice(
      this.startIndex,
      this.endIndex
    );
  }

  updatePlates() {
    this.subscription.add(
      this.platesApi.plates$.subscribe((value) => {
        this.plates = value;
      })
    );
  }

  showPlateForm(template: TemplateRef<any>) {
    this.modalService.showModal(template);
  }

  addPlate() {
    if (this.addGroup.valid) {
      this.subscription.add(
        this.platesApi.addPlate(this.addGroup.getRawValue()).subscribe(() => {
          this.updatePlates();
          this.modalService.hideModal();
          this.addGroup.reset();
        })
      );
      this.subscription.unsubscribe();
    }
  }

  findPlates() {
    this.subscription.add(
      this.platesApi.plates$
        .pipe(
          map((plates) =>
            plates.filter((plateInfo) =>
              this.searchControl.value
                ? plateInfo.plate.includes(
                    String(this.searchControl.value).toUpperCase()
                  )
                : !!plateInfo.plate
            )
          )
        )
        .subscribe((value) => {
          this.plates = value;
          this.changePage(1);
        })
    );
    this.subscription.unsubscribe();
  }

  get pages() {
    return [...Array(Math.ceil(this.plates.length / this.itemsPerPage))].map(
      (_, index) => index + 1
    );
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.endIndex = this.startIndex + this.itemsPerPage;
    this.paginatePlates();
  }
}
