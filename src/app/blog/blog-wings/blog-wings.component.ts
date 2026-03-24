import { Component } from '@angular/core';
import { BlogMetaInfo } from '../models/meta-info';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LanguageValues } from '../../language-values';
import { BlogComponent } from '../blog.component';

@Component({
  selector: 'app-blog-wings',
  standalone: true,
  imports: [NgbTooltip, RouterModule],
  templateUrl: './blog-wings.component.html',
  styleUrl: './blog-wings.component.scss'
})
export class BlogWingsComponent {
  public static metaInfo:BlogMetaInfo = {
    created: new Date("2026-03-24"),
    lastUpdated: new Date("2026-03-24")
  };
  public get metaInfo():string {
    return BlogComponent.blogMetaInfoToString(BlogWingsComponent.metaInfo);
  }

  public get contactRoute():string {
    return LanguageValues.routes['contact'][LanguageValues.language];
  }
  public get hostname():string {
    return window.location.hostname;
  }

  public get language():string {
    return LanguageValues.language;
  }

  public constructor(private titleService: Title, private metaService: Meta, private activatedRoute: ActivatedRoute, public router:Router) {}
  
  ngOnInit(): void {
    this.activatedRoute.url.subscribe(url => {
      this.titleService.setTitle('Human Wings');
      this.metaService.updateTag({property: 'og:title', content: 'Human Wings'});
      this.metaService.updateTag({property: 'og:url', content: 'https://ascyt.com' + this.router.url});
      this.metaService.updateTag({property: 'og:description', content: 'A blog post that explores the physical, evolutionary, and societal implications of the hypothetical winged person.'});
    });
  }
}
