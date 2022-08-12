import { Component } from '@angular/core';
import { ColorModeService } from './providers/auth-service/color-mode.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private colorModeService: ColorModeService
  ) {
    const theme = colorModeService.getMode();
    colorModeService.setMode(theme);
  }
}
