import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { LanguageValues } from '../language-values';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgbModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  constructor(private titleService: Title, private metaService: Meta, private activatedRoute: ActivatedRoute, private router: Router) { }

  public readonly language:string = LanguageValues.language;

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(url => {  
      this.titleService.setTitle((this.language === 'de' ? 'Ascyt • Über Mich' : 'Ascyt • About'));
      this.metaService.updateTag({property: 'og:title', content: (this.language === 'de' ? 'Ascyt • Über mich' : 'Ascyt • About')});
      this.metaService.updateTag({property: 'og:url', content: 'https://ascyt.com' + this.router.url});
      this.metaService.updateTag({property: 'og:description', content: (this.language === 'de' ? 'Informationen über Ascyt (Filip Schauer), einschließlich seiner Hobbys, Interessen und mehr.' : 'Information about Ascyt (Filip Schauer), including his hobbies, interests, and more.')});
    });
  }
}
