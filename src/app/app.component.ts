import { Component, OnInit } from "@angular/core";
import { setTheme } from "ngx-bootstrap/utils";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styles: [".app.component.css"],
})
export class AppComponent implements OnInit {
  totalAngularPackages;

  constructor() {
    setTheme("bs4");
  }

  ngOnInit() {}
}
