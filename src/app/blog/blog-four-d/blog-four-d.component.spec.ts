import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogFourDComponent } from './blog-four-d.component';

describe('BlogFourDComponent', () => {
  let component: BlogFourDComponent;
  let fixture: ComponentFixture<BlogFourDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogFourDComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogFourDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
