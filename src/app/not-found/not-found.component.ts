import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LanguageValues } from '../language-values';

@Component({
    selector: 'app-not-found',
    imports: [RouterModule],
    templateUrl: './not-found.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  public readonly language:string = LanguageValues.language;

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(url => {  
      this.titleService.setTitle('Ascyt • Not Found');
      this.metaService.updateTag({property: 'og:title', content: 'Ascyt • Not Found'});
      this.metaService.updateTag({property: 'og:url', content: 'https://ascyt.com' + this.router.url});
      this.metaService.updateTag({property: 'og:description', content: 'The page you are looking for could not be found.'});
    });
  }
}
