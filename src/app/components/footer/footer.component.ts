import { Component } from "@angular/core";
import PerfectScrollbar from "perfect-scrollbar";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"],
})
export class FooterComponent {
  currentDateTime: Date = new Date();

  scrollTop() {
    const elemMainPanel = <HTMLElement>document.querySelector(".main-panel");
    elemMainPanel.scroll({ top: 0, behavior: 'smooth' });
    const ps = new PerfectScrollbar(elemMainPanel);
    ps.update();
  }
}
