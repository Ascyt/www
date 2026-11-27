import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-redirecting',
    imports: [],
    templateUrl: './redirecting.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './redirecting.component.scss'
})
export class RedirectingComponent {
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(url => {  
      this.titleService.setTitle('Ascyt - Redirecting...');
      this.metaService.updateTag({property: 'og:title', content: 'Ascyt'});
      this.metaService.updateTag({property: 'og:url', content: 'https://ascyt.com' + this.router.url});
      this.metaService.updateTag({property: 'og:description', content: ''});
    });
  }
}
