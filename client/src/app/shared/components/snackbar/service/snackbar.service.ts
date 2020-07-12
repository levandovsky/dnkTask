import { Injectable, RendererFactory2, Renderer2 } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SnackbarService {
  private _content: string;
  private _show: boolean;

  constructor() {}
  set content(value: string) {
    this._content = value;
  }
  get content() {
    return this._content;
  }

  get shown() {
    return this._show;
  }

  showSnackbar(content: string) {
    this._show = true;
    this._content = content;
  }

  hideSnackbar() {
    this._show = false;
  }
}
