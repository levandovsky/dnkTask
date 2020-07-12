import { Component, OnInit, Input, Renderer2 } from "@angular/core";
import { ModalService } from "./service/modal.service";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
})
export class ModalComponent implements OnInit {
  constructor(public modalService: ModalService) {}

  ngOnInit() {}
  handleClick(e: PointerEvent) {
    const target = e.target as HTMLElement;
    if (this.modalService.closeOnOverlayClick && target.id === "overlay") {
      this.modalService.hideModal();
    }
  }
}
