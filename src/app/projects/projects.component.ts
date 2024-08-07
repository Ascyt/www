
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { ThemeSwitcherService } from '../theme-switcher/theme-switcher.service';
import { MoreProjectsViewComponent } from './more-projects-view/more-projects-view.component';

export enum Type {
  Normal,
  Golden,
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

  public constructor(public themeSwitcher:ThemeSwitcherService, public modalService:NgbModal) {}

  projects: Project[] = [
    {name: 'Tiersorter', description: 'An item ranker (soon also tierlist maker) that ranks items on simple "Which of the two is better?" decisions', url:'https://tiersorter.ascyt.com/', image: 'assets/images/projects/tiersorter.png', type: Type.Golden},
    {name: 'ezgpt', description: 'Intuitive and easy-to-use Python library for usage of OpenAI\'s API', url:'https://pypi.org/project/ezgpt', image: 'assets/images/projects/ezgpt.png', type: Type.Golden},
    {name: 'SMSH', description: 'Simple but powerful markup language that compiles to HTML', url:'https://smsh.ascyt.com/', image: 'assets/images/projects/smsh.png', type: Type.Normal},
    {name: 'Text Tools', description: 'A collection of useful text tools', url:'https://tt.ascyt.com/', image: 'assets/images/projects/tt.png', type: Type.Normal},
    // Special project to open the more projects view
    {name: 'View more', description: null, url:null, image: null, type: Type.MoreView, 
      onClick: () => this.openMoreView() /* the arrow function is needed, otherwise `this` context gets lost */ },
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
}