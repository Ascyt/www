import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { saveAs } from 'file-saver';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageValues } from '../language-values';
 
@Component({
  selector: 'app-secret',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './secret.component.html',
  styleUrl: './secret.component.scss'
})
export class SecretComponent {
  constructor(private titleService: Title, private metaService: Meta, private activatedRoute: ActivatedRoute, private router:Router) { }

  public readonly language:string = LanguageValues.language;

  blur:number = 5;
  hereIndex:number = 0;
  hereTexts:string[] = ['here', 'here', 'where?', 'where am i?', 'what has been found?', 'what is happening?', 'i don\t know where i am', 'i think i\'m lost', 'is there any escape?', 'i don\'t know what to do', 'i think it\'s hopeless', 'there\'s no hope', 'unless...?'];
  showDot:boolean = false;

  blurClick(event:MouseEvent):void {
    event.preventDefault();
    // remove selection
    window.getSelection()?.removeAllRanges();

    this.blur--;

    if (this.blur <= 0) {
      if (this.hereIndex < this.hereTexts.length - 1) {
        this.hereIndex++;
      }
      else {
        this.showDot = true;
      }
      this.blur = 5;
    }
  }

  downloadFile():void {
    const blob = new Blob(['73°27\'18.6"S 126°22\'31.2"W\n\nhttps://[?].ascyt.com/'], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'found.txt');
  }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(url => {  
      this.titleService.setTitle('Ascyt • ???');
      this.metaService.updateTag({property: 'og:title', content: 'Ascyt • ???'});
      this.metaService.updateTag({property: 'og:url', content: 'https://ascyt.com' + this.router.url});
      this.metaService.updateTag({property: 'og:description', content: '???'});
    });
  }
}
