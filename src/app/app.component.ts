import {
  Component,
  OnInit,
  ViewChild,
  Renderer2,
  ElementRef,
} from '@angular/core';
import {
  Gesture,
  Animation,
  AnimationController,
  GestureController,
  createGesture,
} from '@ionic/angular';
import { ColorModeService } from './providers/auth-service/color-mode.service';
import { Platform } from '@ionic/angular';
import { FACTORY_MENU_ITEMS } from './pages/pages-menu';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  pageList = FACTORY_MENU_ITEMS;
  darkMode: boolean = true;
  @ViewChild('splitPane') splitPane: ElementRef;
  @ViewChild('divider') divider: ElementRef;
  workingWidth = 300;
  startingWidth = 300;
  gesture: Gesture;

  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private colorModeService: ColorModeService,
    private renderer: Renderer2,
    private gestureCtrl: GestureController
  ) {
    const theme = colorModeService.getMode();
    colorModeService.setMode(theme);
  }

  ngOnInit(): void {
    this.gesture = this.gestureCtrl.create({
      gestureName: 'resize-menu',
      el: this.divider.nativeElement,
      onStart: this.onStart,
      onMove: this.onMove,
      onEnd: this.onEnd,
      gesturePriority: 99999,
    });
    this.gesture.enable(true);
  }

  onStart(event) {
    console.log('onStart : ', event.currentX);
  }

  // onMove(event) {
  //   this.workingWidth = this.startingWidth + event.deltaX;

  //   this.renderer.setStyle(
  //     this.splitPane,
  //     '--side-width',
  //     `${this.workingWidth} px`
  //   );
  // }

  onMove = (ev) => {
    requestAnimationFrame(() => {
      this.workingWidth = this.startingWidth + ev.deltaX;
      this.splitPane.nativeElement.style.setProperty(
        '--side-width',
        `${this.workingWidth}px`
      );
    });
  };

  onEnd(ev) {
    this.startingWidth = this.workingWidth;
  }

  toggleColorMode() {
    // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark');
  }
}
