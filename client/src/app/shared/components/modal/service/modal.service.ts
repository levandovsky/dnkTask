import {
  Injectable,
  Renderer2,
  RendererFactory2,
  TemplateRef,
} from "@angular/core";
import { Template } from "@angular/compiler/src/render3/r3_ast";

@Injectable({
  providedIn: "root",
})
export class ModalService {
  private _open = false;
  private _closeOnOverlayClick = true;
  private renderer: Renderer2;
  template: TemplateRef<any> | null;
  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }
  set closeOnOverlayClick(value: boolean) {
    this._closeOnOverlayClick = value;
  }
  get closeOnOverlayClick() {
    return this._closeOnOverlayClick;
  }
  set open(value: boolean) {
    this._open = value;
  }
  get open() {
    return this._open;
  }

  public showModal(template: TemplateRef<any>) {
    this.open = true;
    this.template = template;
    this.renderer.setStyle(document.body, "overflow-y", "hidden");
  }

  public hideModal() {
    this.open = false;
    this.template = null;
    this.renderer.removeStyle(document.body, "overflow-y");
  }
}
