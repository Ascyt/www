import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
  public constructor(private titleService: Title, private metaService: Meta, private activatedRoute: ActivatedRoute, private router:Router) {}

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(url => {
      this.titleService.setTitle('Ascyt • Blog');
      this.metaService.updateTag({property: 'og:title', content: 'Ascyt • Blog'});
      this.metaService.updateTag({property: 'og:url', content: 'https://ascyt.com' + this.router.url});
      this.metaService.updateTag({property: 'og:description', content: 'Blog posts and articles from Ascyt (Filip Schauer).'});
    });
  }
}
