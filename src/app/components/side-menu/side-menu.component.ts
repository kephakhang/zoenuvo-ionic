import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SideMenuOption } from './models/side-menu-option';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SideMenuComponent {
  optionHeight = 45;
  paddingLeft = 16;
  @Input() menuList: Array<SideMenuOption>;

  constructor() {}

  toggle(item) {
    item.expanded = !item.expanded;
  }
}
