import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LanguageValues } from '../../language-values';

interface Project {
  name: string;
  description: string|null;
  url: string|null;
}

@Component({
  selector: 'app-more-projects-view',
  standalone: true,
  imports: [NgbModule, CommonModule],
  templateUrl: './more-projects-view.component.html',
  styleUrl: './more-projects-view.component.scss'
})
export class MoreProjectsViewComponent {
  constructor(public activeModal: NgbActiveModal) {}

  public readonly language:string = LanguageValues.language;

  projects:Project[] = this.language === 'de' ? [
    {name: '4D-Projektions-Spielplatz', description: 'Orthographische Darstellung eines 4-dimensionalen Tesserakts mit Rotationsoptionen. Vorgänger meines 4D-Simulationsprojekts.', url:'https://ascyt.itch.io/4d-projection-playground'},
    {name: 'ezgpt', description: 'Intuitive und einfach zu verwendende Python-Bibliothek für die Nutzung der OpenAI-API. Kann sein dass es noch funktioniert, dran arbeiten tue ich aber nicht mehr.', url:'https://pypi.org/project/ezgpt'},
    {name: 'Textwerkzeuge', description: 'Kleine Sammlung nützlicher Textwerkzeuge.', url:'https://tt.ascyt.com/'},
    {name: 'Unity-Vorlage für Kamerasteuerung', description: 'Vorlagen Assets-Ordner für Unity, der eine 3D-Szene mit einer beweglichen Kamera enthält. Hauptsächlich für universumähnliche Spiele/Anwendungen mit voller Bewegungs- und Rotationsfreiheit gemacht. Wird auch für meine 4D-Simulation verwendet.', url:'https://github.com/Ascyt/Unity-Camera-Movement-Template'},
    {name: 'this is game', description: 'Ein 2D Shooter mit Upgrades. Wahrscheinlich eines meiner größten Projekte, hab\'s letztendlich aber trotzdem aufgegeben.', url: 'https://ascyt.itch.io/this-is-game'},
    {name: 'gamejamspace', description: 'Ein kleines schwieriges 2D-Shooter-Spiel.', url: 'https://ascyt.itch.io/gamejamspace'},
    {name: 'HoverDream', description: 'Ein süchtig machendes Scratch-Spiel, das mir buchstäblich in einem Traum offenbart wurde.', url: 'https://scratch.mit.edu/projects/1057808404/'},
    {name: 'Partikelsimulator', description: 'Scratch-Projekt mit Partikeln zum Herumspielen.', url: 'https://scratch.mit.edu/projects/707207683/'},
    {name: 'Evolutionssimulator', description: 'Ein einfacher Evolutionssimulator, der in Scratch erstellt wurde.', url: 'https://scratch.mit.edu/projects/453814860/'},
    {name: 'Laser Balls', description: 'Mein erstes vollständig abgeschlossenes und veröffentlichtes Spiel.', url: 'https://scratch.mit.edu/projects/434888723/'},
    {name: 'Seltenheiten', description: 'Umfangreiche Liste von frei verwendbaren Seltenheiten für Videospiele.', url: 'https://rarities.ascyt.com/'},
    {name: 'Faltende Elytren', description: 'Minecraft Vanilla Ressourcenpaket, das das Modell der Elytren ändert.', url: 'https://www.planetminecraft.com/texture-pack/folding-elytra/'},
    {name: 'Minesweeper Musteranalyse', description: 'Einfaches Skript, welches Minesweeper-Simulationen durchführt, um zu sehen, wie oft jedes Muster auftritt.', url:'https://github.com/Ascyt/Minesweeper-pattern-prevalence'},
    {name: 'Der Eisberg', description: '???', url: 'https://the-iceberg.ascyt.com/'},
  ] : [
    {name: '4D Projection Playground', description: 'Orthographic projection of a 4-dimensional tesseract with rotation options. Predecessor to my 4D Simulation project.', url:'https://ascyt.itch.io/4d-projection-playground'},
    {name: 'ezgpt', description: 'Intuitive and easy-to-use Python library for usage of OpenAI\'s API. Might still work, I\'m not maintaining it anymore though.', url:'https://pypi.org/project/ezgpt'},
    {name: 'Text Tools', description: 'A collection of useful text tools.', url:'https://tt.ascyt.com/'},
    {name: 'Unity Camera Movement Template', description: 'A template Assets folder for Unity that contains a 3D scene with a moveable camera. It\'s mainly made for universe-like games/applications with a full range of motion and rotation. Used for my 4D Simulation.', url:'https://github.com/Ascyt/Unity-Camera-Movement-Template'},
    {name: 'this is game', description: 'A 2D shooter game with upgrades. Probably one of my biggest projects, but abandoned nonetheless.', url: 'https://ascyt.itch.io/this-is-game'},
    {name: 'gamejamspace', description: 'A small difficult 2D shooter game.', url: 'https://ascyt.itch.io/gamejamspace'},
    {name: 'HoverDream', description: 'An addicting Scratch game that was literally revealed to me in a dream.', url: 'https://scratch.mit.edu/projects/1057808404/'},
    {name: 'Particle Simulator', description: 'Scratch project to play around with particles.', url: 'https://scratch.mit.edu/projects/707207683/'},
    {name: 'Evolution Simulator', description: 'A simple evolution simulator made in Scratch.', url: 'https://scratch.mit.edu/projects/453814860/'},
    {name: 'Laser Balls', description: 'My first ever fully finished and published game.', url: 'https://scratch.mit.edu/projects/434888723/'},
    {name: 'Rarities', description: 'Comprehensive list of free-to-use rarities for video games.', url: 'https://rarities.ascyt.com/'},
    {name: 'Folding Elytra', description: 'Minecraft Vanilla resource pack that changes the model of the Elytra.', url: 'https://www.planetminecraft.com/texture-pack/folding-elytra/'},
    {name: 'Minesweeper Pattern Prevalence', description: 'A simple script that runs Minesweeper simulations to see how often each pattern occurs.', url:'https://github.com/Ascyt/Minesweeper-pattern-prevalence'},
    {name: 'The Iceberg', description: '???', url: 'https://the-iceberg.ascyt.com/'},
  ];
}
