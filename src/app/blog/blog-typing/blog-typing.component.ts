import { Component } from '@angular/core';
import { BlogMetaInfo } from '../models/meta-info';
import { DatePipe } from '@angular/common';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LanguageValues } from '../../language-values';
import { BlogComponent } from '../blog.component';

@Component({
  selector: 'app-blog-typing',
  standalone: true,
  imports: [NgbTooltip, RouterModule],
  templateUrl: './blog-typing.component.html',
  styleUrl: './blog-typing.component.scss'
})
export class BlogTypingComponent {
  public static metaInfo:BlogMetaInfo = {
    created: new Date("2026-02-19"),
    lastUpdated: new Date("2026-02-19")
  };
  public get metaInfo():string {
    return BlogComponent.blogMetaInfoToString(BlogTypingComponent.metaInfo);
  }

  public get contactRoute():string {
    return LanguageValues.routes['contact'][LanguageValues.language];
  }
  public get hostname():string {
    return window.location.hostname;
  }

  public constructor(private titleService: Title, private metaService: Meta, private activatedRoute: ActivatedRoute, public router:Router) {}
  
  ngOnInit(): void {
    this.activatedRoute.url.subscribe(url => {
      this.titleService.setTitle('A Guide To Fast Typing');
      this.metaService.updateTag({property: 'og:title', content: 'A Guide To Fast Typing'});
      this.metaService.updateTag({property: 'og:url', content: 'https://ascyt.com' + this.router.url});
      this.metaService.updateTag({property: 'og:description', content: 'A comprehensive guide to learning to type quickly on a computer keyboard.'});
    });
  }
}
