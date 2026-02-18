import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ThemeSwitcherService } from '../theme-switcher/theme-switcher.service';
import { MoreProjectsViewComponent } from './more-projects-view/more-projects-view.component';
import { Meta, Title } from '@angular/platform-browser';
import { LanguageValues } from '../language-values';

export enum Type {
  Normal,
  MoreView
}
interface Project {
  name: string;
  description: string|null;

  url: string|null;
  onClick?: () => void;

  image: string|null;
  type: Type;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, NgbModule, RouterModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  Type = Type;

  public constructor(public themeSwitcher:ThemeSwitcherService, public modalService:NgbModal, 
    private titleService: Title, private metaService: Meta, private activatedRoute: ActivatedRoute, private router:Router) {}

  public readonly language = LanguageValues.language;

  projects: Project[] = this.language === 'de' ? [
    {name: '4D Simulation', description: 'Ein paar 4-dimensionale Szenen, in denen man sich bewegen und drehen kann, dargestellt in einem 3-dimensionalen Ansichtsfenster.', url: 'https://ascyt.itch.io/4d-sim', image: 'assets/images/projects/4d-sim.png', type: Type.Normal},
    {name: 'OpenQOTD', description: 'Ein Discord-Bot, der Tägliche Nachrichten ("Question Of The Days" bzw. benutzerdefinierte) verschicken kann.', url: 'https://open-qotd.ascyt.com/', image: 'assets/images/projects/open-qotd.png', type: Type.Normal},
    {name: '4D-Erklärung', description: 'Ein YouTube-Video, das eine neuartige Methode zur Darstellung der vierten Dimension erklärt.', url: 'https://youtu.be/Oe7MjfQokpE', image: 'assets/images/projects/4d-video.png', type: Type.Normal},
    {name: 'Tiersorter', description: 'Ein Werkzeug zum Sortieren von benutzerdefinierten Dingen mithilfe von "Welcher von beiden ist besser?"-Entscheidungen.', url:'https://tiersorter.ascyt.com/', image: 'assets/images/projects/tiersorter.png', type: Type.Normal},
    {name: 'WisdomKeys', description: 'Einfache Vokabellern-Website, die es dir auch ermöglicht, deine Tippgeschwindigkeit zu üben.', url:'https://wisdomkeys.ascyt.com/', image: 'assets/images/projects/wisdomkeys.png', type: Type.Normal},
    {name: 'SMSH', description: 'Einfache, aber leistungsstarke Markup-Sprache, die zu HTML kompiliert.', url:'https://smsh.ascyt.com/', image: 'assets/images/projects/smsh.png', type: Type.Normal},

    {name: 'Mehr anzeigen', description: null, url:null, image: null, type: Type.MoreView, 
      onClick: () => this.openMoreView() },
  ] : [
    {name: '4D Simulation', description: 'Some 4-dimensional scenes you can move and rotate in, rendered to a 3-dimensional viewport.', url: 'https://ascyt.itch.io/4d-sim', image: 'assets/images/projects/4d-sim.png', type: Type.Normal},
    {name: 'OpenQOTD', description: 'Discord bot that handles Question Of The Days with custom questions and more.', url: 'https://open-qotd.ascyt.com/', image: 'assets/images/projects/open-qotd.png', type: Type.Normal},
    {name: 'Explaining 4D', description: 'A YouTube video that explains a novel way to display the fourth dimension.', url: 'https://youtu.be/Oe7MjfQokpE', image: 'assets/images/projects/4d-video.png', type: Type.Normal},
    {name: 'Tiersorter', description: 'An item ranker that ranks items on simple "Which of the two is better?" decisions.', url:'https://tiersorter.ascyt.com/', image: 'assets/images/projects/tiersorter.png', type: Type.Normal},
    {name: 'WisdomKeys', description: 'Simple vocabulary learning website that lets you practice your typing speed.', url:'https://wisdomkeys.ascyt.com/', image: 'assets/images/projects/wisdomkeys.png', type: Type.Normal},
    {name: 'SMSH', description: 'Simple but powerful markup language that compiles to HTML.', url:'https://smsh.ascyt.com/', image: 'assets/images/projects/smsh.png', type: Type.Normal},

    // Special project to open the more projects view
    {name: 'View more', description: null, url:null, image: null, type: Type.MoreView, 
      onClick: () => this.openMoreView() /* the arrow function is needed, otherwise the `this` context gets lost */ },
  ];

  public openMoreView() {
    this.modalService.open(MoreProjectsViewComponent, { centered: true, size: 'lg', scrollable: true });
  }

  public onProjectClick(project: Project, event: MouseEvent) {
    if (project.onClick) {
      event.preventDefault();
      project.onClick();
    }
  }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(url => {  
      this.titleService.setTitle((this.language === 'de' ? 'Ascyt • Projekte' : 'Ascyt • Projects'));
      this.metaService.updateTag({property: 'og:title', content: (this.language === 'de' ? 'Ascyt • Projekte' : 'Ascyt • Projects')});
      this.metaService.updateTag({property: 'og:url', content: (this.language === 'de' ? 'https://de.ascyt.com/' : 'https://ascyt.com') + this.router.url});
      this.metaService.updateTag({property: 'og:description', content: (this.language === 'de' ? 'Eine Liste von Projekten von Ascyt (Filip Schauer).' : 'A list of projects made by Ascyt (Filip Schauer).')});
    });
  }
}