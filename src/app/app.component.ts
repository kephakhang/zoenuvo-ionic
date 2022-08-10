import { Component } from '@angular/core';
import { ColorModeService } from './providers/auth-service/color-mode.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(colorMode: ColorModeService) {
    colorMode.darkMode$.subscribe((darkMode) => {
      if (darkMode) {
        document.body.classList.add('dark-theme');
      } else {
        document.body.classList.remove('dark-theme');
      }
    });
  }
}
