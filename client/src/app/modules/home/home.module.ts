import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { PlateCardComponent } from "./components/plate-card/plate-card.component";
import { ModalComponent } from "src/app/shared/components/modal/modal.component";
import { ReactiveFormsModule } from "@angular/forms";
import { PlateInfoGroupComponent } from "src/app/shared/components/plate-info-group/plate-info-group.component";

@NgModule({
  declarations: [
    HomePageComponent,
    PlateCardComponent,
    PlateInfoGroupComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ReactiveFormsModule, PlateInfoGroupComponent],
})
export class HomeModule {}
