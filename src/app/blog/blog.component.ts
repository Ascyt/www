import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LanguageValues } from '../language-values';
import { ThemeSwitcherService } from '../theme-switcher/theme-switcher.service';

interface Blog {
  name: string;
  description: string|null;

  routerLink: string|null;

  image: string|null;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
  public get language():string {
    return LanguageValues.language;
  }

  public get currentRoute():string {
    return window.location.toString();
  }

  public constructor(private titleService: Title, private metaService: Meta, private activatedRoute: ActivatedRoute, private router:Router, public themeSwitcher: ThemeSwitcherService) {}

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(url => {
      this.titleService.setTitle((this.language === 'de' ? 'Ascyt • Blog' : 'Ascyt • Blog'));
      this.metaService.updateTag({property: 'og:title', content: (this.language === 'de' ? 'Ascyt • Blog' : 'Ascyt • Blog')});
      this.metaService.updateTag({property: 'og:url', content: (this.language === 'de' ? 'https://de.ascyt.com' : 'https://ascyt.com') + this.router.url});
      this.metaService.updateTag({property: 'og:description', content: (this.language === 'de' ? 'Blogbeiträge und Artikel von Ascyt (Filip Schauer).' : 'Blog posts and articles from Ascyt (Filip Schauer).')});
    });
  }

    blogs: Blog[] = this.language === 'de' ? [
      {name: '[EN] A Guide to Fast Typing', description: 'A comprehensive guide to learning to type quickly on a computer keyboard.', routerLink: 'typing', image: 'assets/images/blog/typing/typing.png'},
    ] : [
      {name: 'A Guide to Fast Typing', description: 'A comprehensive guide to learning to type quickly on a computer keyboard.', routerLink: 'typing', image: 'assets/images/blog/typing/typing.png'},
    ];
  
}
