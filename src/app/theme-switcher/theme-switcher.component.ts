import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ThemeSwitcherService } from './theme-switcher.service';

import { Component, output, ChangeDetectionStrategy, inject } from '@angular/core';

@Component({
    selector: 'app-theme-switcher',
    templateUrl: './theme-switcher.component.html',
    styleUrls: ['./theme-switcher.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [NgbModule, FormsModule],
    host: {
        '(document:mouseup)': 'onDocumentMouseUp()'
    }
})
export class ThemeSwitcherComponent {
  readonly themeChanged = output<void>();

  public isPressingButton:boolean = false;
  public hasPressedButton:boolean = false;
  public startPressTime:number = 0;

  public delayedIsLightTheme:boolean|null = null;

  public readonly themeSwitcher = inject(ThemeSwitcherService);

  ngOnInit():void {
    // Load svgs to cache
    const svgUrls:string[] = ['assets/images/theme/dark.svg', 'assets/images/theme/light.svg'];

    svgUrls.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }

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
