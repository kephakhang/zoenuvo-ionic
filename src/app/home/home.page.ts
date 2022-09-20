import { Component, ViewChild, ElementRef } from '@angular/core';
import {
  Gesture,
  Animation,
  AnimationController,
  GestureController,
  createGesture,
} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  darkMode: boolean = true;

  @ViewChild('paragraph') p: ElementRef;
  @ViewChild('rectangle') rectangle: ElementRef;

  constructor(private gestureCtrl: GestureController) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkMode = prefersDark.matches;
  }

  ngOnInit() {
    const gesture = this.gestureCtrl.create({
      threshold: 15,
      gestureName: 'move',
      el: this.rectangle.nativeElement,
      onMove: (detail) => {
        this.onMove(detail);
      },
    });

    gesture.enable();
  }

  private onMove(detail) {
    const type = detail.type;
    const currentX = detail.currentX;
    const deltaX = detail.deltaX;
    const velocityX = detail.velocityX;

    this.p.nativeElement.innerHTML = `
    <div>Type: ${type}</div>
    <div>Current X: ${currentX}</div>
    <div>Delta X: ${deltaX}</div>
    <div>Velocity X: ${velocityX}</div>
  `;
  }

  toggleColorMode() {
    // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark');
  }
}
