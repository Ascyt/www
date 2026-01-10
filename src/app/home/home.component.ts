import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SpinningTesseractComponent } from '../spinning-tesseract/spinning-tesseract.component';
import { LanguageValues } from '../language-values';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, NgbModule, SpinningTesseractComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private titleService: Title, private metaService: Meta, private activatedRoute: ActivatedRoute, private router:Router) { }

  public readonly language:string = LanguageValues.language;
  private readonly birthDate = new Date('2007-04-25');

  public get isBirthday(): boolean {
    const today = new Date();

    return today.getMonth() === this.birthDate.getMonth() && today.getDate() === this.birthDate.getDate();
  }

  public get startsWithVowel():boolean {
    const vowelNumbers:number[] = [8, 11, 18, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89];
    return vowelNumbers.includes(this.currentAge);
  }

  public get currentAge(): number {
    const today = new Date();

    const yearDiff = today.getFullYear() - this.birthDate.getFullYear();
    if (today.getMonth() < this.birthDate.getMonth() || (today.getMonth() === this.birthDate.getMonth() && today.getDate() < this.birthDate.getDate())) {
      return yearDiff - 1;
    }
    return yearDiff;
  }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(url => {
        this.titleService.setTitle((this.language === 'de' ? 'Ascyt • Startseite' : 'Ascyt • Home'));
        this.metaService.updateTag({ property: 'og:title', content: (this.language === 'de' ? 'Ascyt • Startseite' : 'Ascyt • Home') });
        this.metaService.updateTag({ property: 'og:url', content: (this.language === 'de' ? 'https://de.ascyt.com' : 'https://ascyt.com') + this.router.url });
        this.metaService.updateTag({ property: 'og:description', content:  (this.language === 'de' ? 'Die Startseite der persönlichen Webseite von Ascyt (Filip Schauer).' : 'The home page of the personal website of Ascyt (Filip Schauer).') });
    });
  }
}
