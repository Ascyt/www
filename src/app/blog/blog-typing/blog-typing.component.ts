import { Component } from '@angular/core';
import { BlogMetaInfo } from '../models/meta-info';
import { DatePipe } from '@angular/common';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-blog-typing',
  standalone: true,
  imports: [DatePipe, NgbTooltip],
  templateUrl: './blog-typing.component.html',
  styleUrl: './blog-typing.component.scss'
})
export class BlogTypingComponent {
  public metaInfo:BlogMetaInfo = {
    created: new Date("2026-02-18"),
    lastUpdated: new Date("2026-02-18")
  };
}
