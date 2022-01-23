import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { DataSharedService } from 'src/app/common/data-shared.service';
import { environment } from 'src/environments/environment';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: '/',
    title: 'Home',
    icon: 'dashboard',
    class: '',
  },
  {
    path: '/reports/zones',
    title: 'Report',
    icon: 'timeline',
    class: '',
  },
  {
    path: '/reports/lines',
    title: 'Line Report',
    icon: 'timeline',
    class: '',
  },
  {
    path: '/target',
    title: 'Target',
    icon: 'assignment',
    class: '',
  },
  {
    path: '/production',
    title: 'Production',
    icon: 'track_changes',
    class: '',
  },
  {
    path: "/blog",
    title: 'Blog',
    icon: 'library_books',
    class: '',
  },
  {
    path: '/faq',
    title: 'FAQ',
    icon: 'contact_support',
    class: '',
  },
  // {
  //   path: '/about-us',
  //   title: 'About Us',
  //   icon: 'accessibility_new',
  //   class: '',
  // },
  // {
  //   path: '/contact-us',
  //   title: 'Contact Us',
  //   icon: 'import_contacts',
  //   class: '',
  // }, 
  // {
  //   path: '/disclaimer',
  //   title: 'Disclaimer',
  //   icon: 'aspect_ratio',
  //   class: '',
  // },
  // {
  //   path: '/privacy',
  //   title: 'Privacy Policy',
  //   icon: 'archive',
  //   class: '',
  // },
  // {
  //   path: '/legal',
  //   title: 'Legal',
  //   icon: 'card_travel',
  //   class: '',
  // },
  {
    path: '/um',
    title: 'User Management',
    icon: 'supervised_user_circle',
    class: '',
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
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  menuItems: any = [];
  selectedDate: any = '';
  minDate: Date = new Date(2021, 9, 4);  // oct 4 2021 start Date
  maxDate: Date = new Date();

  constructor(private dataSharedService: DataSharedService, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.selectedDate = moment().format('YYYY-MM-DD');

    var now = new Date().toString();
    var timeZone = now.replace(/.*[(](.*)[)].*/, '$1');//extracts the content between parenthesis
    if (timeZone != 'India Standard Time' || window.location.origin == 'https://localhost:4200') {
      this.selectedDate = '2022-01-13';
      this.dataSharedService.setDate('2022-01-13');
    } else {
      this.dataSharedService.setDate(this.selectedDate);
    }
  }

  onChangeDate(selDate: string) {
    this.selectedDate = moment(selDate).format('YYYY-MM-DD');
    this.dataSharedService.setDate(this.selectedDate);
  }

  isMobileMenu() {
    if (isPlatformBrowser(this.platformId)) {
      if ($(window).width() > 991) {
        return false;
      }
      return true;
    }

    return;
  }

  onLogout() {
    sessionStorage.clear();
    window.location.href = "#/"
    location.reload();
  }
}
