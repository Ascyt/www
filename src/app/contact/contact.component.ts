import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThemeSwitcherService } from '../theme-switcher/theme-switcher.service';

import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageValues } from '../language-values';

@Component({
    selector: 'app-contact',
    imports: [NgbModule],
    templateUrl: './contact.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './contact.component.scss'
})
export class ContactComponent {
  public readonly themeSwitcherService = inject(ThemeSwitcherService);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  public readonly language:string = LanguageValues.language;
 
  ngOnInit(): void {
    this.activatedRoute.url.subscribe(url => {
      this.titleService.setTitle((this.language === 'de' ? 'Ascyt • Kontakt' : 'Ascyt • Contact'));
      this.metaService.updateTag({property: 'og:title', content: (this.language === 'de' ? 'Ascyt • Kontakt' : 'Ascyt • Contact')});
      this.metaService.updateTag({property: 'og:url', content: (this.language === 'de' ? 'https://de.ascyt.com' : 'https://ascyt.com') + this.router.url});
      this.metaService.updateTag({property: 'og:description', content: (this.language === 'de' ? 'Kontaktinformationen über Ascyt (Filip Schauer), einschließlich Email, Discord, GitHub und mehr.' : 'Contact information about Ascyt (Filip Schauer), including Email, Discord, GitHub, and more.')});
    });
  }
}
