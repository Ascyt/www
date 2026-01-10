import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageValues } from '../language-values';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss'],
  imports: [NgbModule, FormsModule, CommonModule]
})
export class LanguageSwitcherComponent {
  public readonly language:string = LanguageValues.language;

  constructor() {}

  ngOnInit():void {
    // Load svgs to cache
    const svgUrls:string[] = ['assets/images/flag/uk.svg', 'assets/images/flag/at.svg'];

    svgUrls.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }

  public get pathnameAfterClick():string {
    return LanguageValues.getTranslatedRoute(window.location.pathname, this.language === 'de' ? 'en' : 'de');
  }
}
