import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.scss'],
})
export class TitlebarComponent implements OnInit {
  darkMode: boolean = true;
  @Input() title: string = 'Home';
  constructor() {}

  ngOnInit() {}

  toggleColorMode() {
    // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark');
  }
}
