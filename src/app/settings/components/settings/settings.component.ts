import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settingsList = [
    {
      'name': 'User Management',
      'desc': 'Create, Deactivate User',
      'link': '/settings/um',
      'icon': 'nature_people'
    },
    {
      'name': 'Factory',
      'desc': 'Create, Deactivate Factory',
      'link': '/settings/factory',
      'icon': 'markunread_mailbox'
    },
    {
      'name': 'Zone',
      'desc': 'Create, Deactivate Zone',
      'link': '/zone',
      'icon': 'blur_circular'
    },
    {
      'name': 'Line',
      'desc': 'Create, Deactivate Line',
      'link': '/line',
      'icon': 'subject'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
