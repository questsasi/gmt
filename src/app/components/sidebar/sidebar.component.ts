import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { KeycloakService } from "keycloak-angular";

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  {
    path: "/target",
    title: "Target",
    icon: "assignment",
    class: "",
  },
  {
    path: "/production",
    title: "Production",
    icon: "assignment",
    class: "",
  },
  {
    path: "/reports",
    title: "Reports",
    icon: "assignment",
    class: "",
  },
  // {
  //   path: "/hourly_production",
  //   title: "Hourly Production",
  //   icon: "more_time",
  //   class: "",
  // },
  // {
  //   path: "/order",
  //   title: "Order",
  //   icon: "receipt",
  //   class: "",
  // },
  // { path: "/supervisor", title: "Supervisor", icon: "person", class: "" },
  // {
  //   path: "/line",
  //   title: "Line",
  //   icon: "dashboard",
  //   class: "",
  // },
  // { path: "/dashboard", title: "Dashboard", icon: "dashboard", class: "" },
  // { path: "/user-profile", title: "User Profile", icon: "person", class: "" },
  // {
  //   path: "/table-list",
  //   title: "Table List",
  //   icon: "content_paste",
  //   class: "",
  // },
  // {
  //   path: "/typography",
  //   title: "Typography",
  //   icon: "library_books",
  //   class: "",
  // },
  // { path: "/icons", title: "Icons", icon: "bubble_chart", class: "" },
  // {
  //   path: "/notifications",
  //   title: "Notifications",
  //   icon: "notifications",
  //   class: "",
  // },
  // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  menuItems: any = [];

  constructor(private keycloakService: KeycloakService, private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  onLogout() {
    this.keycloakService.logout();
  }

  onClickLogo() {
    this.router.navigate(['/dashboard']);
  }
}
