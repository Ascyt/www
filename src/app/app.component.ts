import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterModule, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThemeSwitcherService } from './theme-switcher/theme-switcher.service';
import { Meta, Title } from '@angular/platform-browser';
import { LanguageValues } from './language-values';
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ThemeSwitcherComponent, RouterModule, RouterLinkActive, NgbModule, LanguageSwitcherComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isCollapsed:boolean = false;
  public language:string = LanguageValues.language;
  public routes:string[] = ['home','blog','projects','contact','about'];
  
  public activeRouteList:string[] = [];
  public get activeRouteListSkipFirst():string[] {
    return this.activeRouteList.slice(1);
  }
  public get highestRoute():string {
    return this.activeRouteList.length > 0 ? this.activeRouteList[this.activeRouteList.length - 1] : '';
  }
  public get firstRoute():string {
    return this.activeRouteList.length > 0 ? this.activeRouteList[0] : '';
  }
  public getActiveRouteTitle(index:number|undefined = undefined):string {
    if (this.activeRouteList.length === 0 || (index !== undefined && (index < 0 || index >= this.activeRouteList.length))) 
      return '';

    let tryRoutes = [...this.activeRouteList];
    if (index !== undefined) {
      tryRoutes = tryRoutes.slice(0, index + 1);
    }
    const joinedTryRoute = tryRoutes.join('/');
    const routeTitle = LanguageValues.routeTitle[joinedTryRoute];

    if (routeTitle)
      return routeTitle[this.language] || routeTitle['en'];

    return this.activeRouteList[index ?? this.activeRouteList.length - 1] || '';
  }

  constructor(public router:Router, public themeSwitcher:ThemeSwitcherService, private metaService: Meta, private activatedRoute: ActivatedRoute) {
    this.updateTheme();
    
    this.router.events.subscribe(() => {
      this.onRouteChange();
    });
  }

  public routeUrlsUntilIndex(index:number):string {
    if (index < 0 || index >= this.activeRouteList.length) {
      return '';
    }
    return this.activeRouteList.slice(0, index + 1).join('/');
  }

  private onRouteChange():void {
    const urlTree = this.router.parseUrl(this.router.url);

    const enUrlTree = LanguageValues.getTranslatedRoute(urlTree.toString(), 'en');

    this.activeRouteList = enUrlTree.split('/').filter(segment => segment.length > 0);
  }


  public getTranslatedRoute(pathname:string):string {
    return LanguageValues.getTranslatedRoute(pathname, this.language, 'en');
  }

  public getRouteTitle(route:string):string {
    return LanguageValues.routeTitle[route][this.language] || route;
  }

  @HostListener('window:mousedown', ['$event'])
  handleMouseDown(event:MouseEvent):void {
    if (document.body.className === 'what' && event.button === 2) {
      event.preventDefault();
      this.router.navigate(['/CLICK-ON-THE-DOT']);
      this.themeSwitcher.themeSwitchCounter = 0;
      this.updateTheme();
      return;
    }
  }
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event:KeyboardEvent):void {
    if (document.body.className === 'what') {
      event.preventDefault();
      this.router.navigate(['/CLICK-ON-THE-DOT']);
      this.themeSwitcher.themeSwitchCounter = 0;
      this.updateTheme();
      return;
    }

    const translatedRoutes = this.routes.map(route => LanguageValues.routes[route][LanguageValues.language]);
    const routeIndex = translatedRoutes.indexOf(this.router.url.split('/')[1]);
    if (routeIndex === -1) 
    {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        this.router.navigate([translatedRoutes[0]]);
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        this.router.navigate([translatedRoutes[translatedRoutes.length - 1]]);
      }
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.router.navigate([translatedRoutes[(routeIndex + 1) % translatedRoutes.length]]);
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.router.navigate([translatedRoutes[(routeIndex - 1 + translatedRoutes.length) % translatedRoutes.length]]);
    }
  }

  
  ngOnInit(): void {
    if (this.language === 'de') {
      this.metaService.updateTag({property: 'og:url', content: 'https://de.ascyt.com/'});
      this.metaService.updateTag({property: 'og:image:alt', content: 'Logo von Ascyt'});
      this.metaService.updateTag({property: 'og:description', content: 'Die persönliche Webseite von Ascyt (Filip Schauer), einem jungen Entwickler aus Österreich.'});
      this.metaService.updateTag({property: 'og:locale', content: 'de_AT'});
      this.metaService.updateTag({property: 'og:locale', content: 'de_DE'});
      this.metaService.updateTag({property: 'og:profile:gender', content: 'männlich'});
    }
  };

  toggleTheme() {
    this.updateTheme();
  }
  updateTheme() {
    if (this.language === 'de') {
      switch (this.themeSwitcher.themeSwitchCounter) { // ignore this
        case 10:
          alert('bro hör auf')
          break;
        case 20:
          alert('ernsthaft')
          break;
        case 30:
          alert('lass es bleiben')
          break;
        case 40:
          alert('du machst es sonst kaputt')
          break;
        case 50:
          document.body.className = 'what'
          alert('super. jetzt ist\'s hin.')
          return;
        case 60:
          alert('es ist kaputt')
          return;
        case 70:
          alert('es ist immer noch kaputt')
          return;
        case 80:
          alert('es hat keinen zweck, man. Es ist kaputt')
          return;
        case 90:
          alert('immer noch da?')
          return;
        case 100:
          alert('okay. du hast gewonnen. ich repariere\'s.')
          this.themeSwitcher.themeSwitchCounter = 0;
          break;
      } if (this.themeSwitcher.themeSwitchCounter > 50) return;
    }
    else {
      switch (this.themeSwitcher.themeSwitchCounter) { // ignore this
        case 10:
          alert('bro stop')
          break;
        case 20:
          alert('seriously')
          break;
        case 30:
          alert('stop it')
          break;
        case 40:
          alert('you\'re gonna break it')
          break;
        case 50:
          document.body.className = 'what'
          alert('great. you broke it.')
          return;
        case 60:
          alert('it\'s broken')
          return;
        case 70:
          alert('it\'s still broken')
          return;
        case 80:
          alert('it\'s no use man. it\'s broken')
          return;
        case 90:
          alert('you\'re still here?')
          return;
        case 100:
          alert('fine. you win. i\'ll fix it.')
          this.themeSwitcher.themeSwitchCounter = 0;
          break;
      } if (this.themeSwitcher.themeSwitchCounter > 50) return;
    }

    document.body.className = this.themeSwitcher.themeClass;
  }
}
