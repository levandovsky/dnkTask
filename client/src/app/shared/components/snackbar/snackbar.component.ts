import { Component, OnInit } from "@angular/core";
import { SnackbarService } from "./service/snackbar.service";

@Component({
  selector: "app-snackbar",
  templateUrl: "./snackbar.component.html",
  styleUrls: ["./snackbar.component.scss"],
})
export class SnackbarComponent implements OnInit {
  constructor(public snackbarService: SnackbarService) {}

  ngOnInit() {}
}
