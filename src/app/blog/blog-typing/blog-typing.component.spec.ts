import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogTypingComponent } from './blog-typing.component';

describe('BlogTypingComponent', () => {
  let component: BlogTypingComponent;
  let fixture: ComponentFixture<BlogTypingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogTypingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogTypingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
