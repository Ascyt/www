import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ThemeSwitcherService } from './theme-switcher.service';

import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss'],
  imports: [NgbModule, FormsModule, CommonModule]
})
export class ThemeSwitcherComponent {
  @Output() themeChanged = new EventEmitter<boolean>();

  public isPressingButton:boolean = false;
  public hasPressedButton:boolean = false;
  public startPressTime:number = 0;

  public delayedIsLightTheme:boolean|null = null;

  constructor(public themeSwitcher: ThemeSwitcherService) {}

  @HostListener('document:mouseup', ['$event'])
  onDocumentMouseUp():void {
    this.themeSwitcherMouseUp();
  }

  toggleTheme():void {
    const remainingTime = 200 - (Date.now() - this.startPressTime);
    if (remainingTime > 0) {
      this.delayedIsLightTheme = this.themeSwitcher.isLightTheme;
      this.hasPressedButton = true;
      setTimeout(() => {
        this.hasPressedButton = false;
        this.delayedIsLightTheme = null;
      }, remainingTime);
    }

    this.isPressingButton = false;
    this.themeSwitcher.toggleTheme();
    this.themeChanged.emit();
  }

  themeSwitcherMouseDown():void {
    this.isPressingButton = true;
    this.startPressTime = Date.now();
  }
  themeSwitcherMouseUp():void {
    this.isPressingButton = false;
  }
}
