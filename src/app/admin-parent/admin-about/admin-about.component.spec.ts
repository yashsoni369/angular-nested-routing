import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminAboutComponent } from './admin-about.component';

describe('AdminAboutComponent', () => {
  let component: AdminAboutComponent;
  let fixture: ComponentFixture<AdminAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAboutComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should implement OnInit', () => {
    expect(component.ngOnInit).toBeDefined();
    expect(typeof component.ngOnInit).toBe('function');
  });

  it('should render "admin-about works!" in a paragraph', () => {
    const compiled = fixture.debugElement.nativeElement;
    const paragraph = compiled.querySelector('p');
    expect(paragraph).toBeTruthy();
    expect(paragraph.textContent).toContain('admin-about works!');
  });

  it('should render "Child2" in an h1 tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    const h1 = compiled.querySelector('h1');
    expect(h1).toBeTruthy();
    expect(h1.textContent).toContain('Child2');
  });

  it('should have exactly one paragraph element', () => {
    const compiled = fixture.debugElement.nativeElement;
    const paragraphs = compiled.querySelectorAll('p');
    expect(paragraphs.length).toBe(1);
  });

  it('should have exactly one h1 element', () => {
    const compiled = fixture.debugElement.nativeElement;
    const headings = compiled.querySelectorAll('h1');
    expect(headings.length).toBe(1);
  });
});
