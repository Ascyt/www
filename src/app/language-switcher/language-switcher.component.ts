import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';

import { LanguageValues } from '../language-values';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-language-switcher',
    templateUrl: './language-switcher.component.html',
    styleUrls: ['./language-switcher.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [NgbModule, FormsModule]
})
export class LanguageSwitcherComponent {
  public readonly language:string = LanguageValues.language;
  public pathnameAfterClickPlain: string = '';

  private readonly router = inject(Router);

  ngOnInit():void {
    // Load svgs to cache
    const svgUrls:string[] = ['assets/images/flag/uk.svg', 'assets/images/flag/at.svg'];

    svgUrls.forEach(url => {
      const img = new Image();
      img.src = url;
    });

    // initialize cached translated pathname and update only on navigation
    this.pathnameAfterClickPlain = LanguageValues.getTranslatedRoute(window.location.pathname, this.language === 'de' ? 'en' : 'de');
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.pathnameAfterClickPlain = LanguageValues.getTranslatedRoute(window.location.pathname, this.language === 'de' ? 'en' : 'de');
      }
    });
  }
  
}
