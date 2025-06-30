import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterModule, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThemeSwitcherService } from './theme-switcher/theme-switcher.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ThemeSwitcherComponent, RouterModule, RouterLinkActive, NgbModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public isCollapsed:boolean = false;
  public routes:string[] = ['home','blog','projects','contact','about']
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
  public get formattedActiveRouteList():string[] {
    if (this.activeRouteList.length === 0) 
      return [];

    const formattedList = this.activeRouteList.map(route => {
      return this.formatSingleRoute(route);
    });

    switch (this.activeRouteList[0]) {
      case 'blog':
        if (this.activeRouteList.length >= 2) {
          switch (this.activeRouteList[1]) {
            case '4d':
              formattedList[1] = '4D Simulation';
              break;
          }
        }
    }

    return formattedList;
  }

  constructor(public router:Router, public themeSwitcher:ThemeSwitcherService, private activatedRoute:ActivatedRoute) {
    this.updateTheme();

    this.router.events.subscribe(() => {
      this.onRouteChange();
    });
  }

  public formatSingleRoute(route:string):string {
    return route
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }

  onRouteChange():void {
    const urlTree = this.router.parseUrl(this.router.url);
    this.activeRouteList = urlTree.root.children['primary']
      ? urlTree.root.children['primary'].segments.map(segment => segment.path)
      : [];
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
    
    const routeIndex = this.routes.indexOf(this.router.url.split('/')[1]);
    if (routeIndex === -1) 
    {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        this.router.navigate([this.routes[0]]);
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        this.router.navigate([this.routes[this.routes.length - 1]]);
      }
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.router.navigate([this.routes[routeIndex + 1] || this.routes[routeIndex]]);
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.router.navigate([this.routes[routeIndex - 1] || this.routes[routeIndex]]);
    }
  }

  toggleTheme() {
    this.updateTheme();
  }
  updateTheme() {
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


    document.body.className = this.themeSwitcher.themeClass;
  }
}
