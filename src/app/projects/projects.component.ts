import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LanguageValues } from '../language-values';
import { ThemeSwitcherService } from '../theme-switcher/theme-switcher.service';
import { MoreProjectsViewComponent } from './more-projects-view/more-projects-view.component';

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
    imports: [NgbModule, RouterModule],
    templateUrl: './projects.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  Type = Type;

  public readonly themeSwitcher = inject(ThemeSwitcherService);
  public readonly modalService = inject(NgbModal);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  public readonly language = LanguageValues.language;

  projects: Project[] = this.language === 'de' ? [
    {name: 'Notes', description: 'Remote-Dateiverwaltung und Markdown-Dokumentationsservice mit Berechtigungsverwaltung.', url: 'https://notes.ascyt.com/', image: 'https://github.com/Ascyt/notes/raw/main/docs/screenshots/directory-phone.png', type: Type.Normal},
    {name: 'OpenQOTD', description: 'Ein Discord-Bot, der Tägliche Nachrichten ("Question Of The Days" bzw. benutzerdefinierte) verschicken kann.', url: 'https://open-qotd.ascyt.com/', image: 'assets/images/projects/open-qotd.png', type: Type.Normal},
    {name: '4D Simulation', description: 'Ein paar 4-dimensionale Szenen, in denen man sich bewegen und drehen kann, dargestellt in einem 3-dimensionalen Ansichtsfenster.', url: 'https://ascyt.itch.io/4d-sim', image: 'assets/images/projects/4d-sim.png', type: Type.Normal},
    {name: '4D-Erklärung', description: 'Ein YouTube-Video, das eine neuartige Methode zur Darstellung der vierten Dimension erklärt.', url: 'https://youtu.be/Oe7MjfQokpE', image: 'assets/images/projects/4d-video.jpg', type: Type.Normal},
    {name: 'Tiersorter', description: 'Ein Werkzeug zum Sortieren von benutzerdefinierten Dingen mithilfe von "Welcher von beiden ist besser?"-Entscheidungen.', url:'https://tiersorter.ascyt.com/', image: 'assets/images/projects/tiersorter.png', type: Type.Normal},
    {name: 'Presentationssystem', description: 'Unity API, um Präsentationen mit einer State-Machine zu erstellen.', url:'https://github.com/Ascyt/presentation-system', image: 'assets/images/projects/presentation-system.png', type: Type.Normal},

    {name: 'Mehr anzeigen', description: null, url:null, image: null, type: Type.MoreView, 
      onClick: () => this.openMoreView() },
  ] : [
    {name: 'Notes', description: 'Remote file managing and markdown documentation service with permission management.', url: 'https://notes.ascyt.com/', image: 'https://github.com/Ascyt/notes/raw/main/docs/screenshots/directory-phone.png', type: Type.Normal},
    {name: 'OpenQOTD', description: 'Discord bot that handles Question Of The Days with custom questions and more.', url: 'https://open-qotd.ascyt.com/', image: 'assets/images/projects/open-qotd.png', type: Type.Normal},
    {name: '4D Simulation', description: 'Some 4-dimensional scenes you can move and rotate in, rendered to a 3-dimensional viewport.', url: 'https://ascyt.itch.io/4d-sim', image: 'assets/images/projects/4d-sim.png', type: Type.Normal},
    {name: 'Explaining 4D', description: 'A YouTube video that explains a novel way to display the fourth dimension.', url: 'https://youtu.be/Oe7MjfQokpE', image: 'assets/images/projects/4d-video.jpg', type: Type.Normal},
    {name: 'Tiersorter', description: 'An item ranker that ranks items on simple "Which of the two is better?" decisions.', url:'https://tiersorter.ascyt.com/', image: 'assets/images/projects/tiersorter.png', type: Type.Normal},
    {name: 'Presentation System', description: 'Unity API to make presentations using a state machine approach.', url:'https://github.com/Ascyt/presentation-system', image: 'assets/images/projects/presentation-system.png', type: Type.Normal},

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