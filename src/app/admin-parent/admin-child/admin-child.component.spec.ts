import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminChildComponent } from './admin-child.component';

describe('AdminChildComponent', () => {
  let component: AdminChildComponent;
  let fixture: ComponentFixture<AdminChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminChildComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminChildComponent);
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

  it('should render "admin-child works!" in a paragraph', () => {
    const compiled = fixture.debugElement.nativeElement;
    const paragraph = compiled.querySelector('p');
    expect(paragraph).toBeTruthy();
    expect(paragraph.textContent).toContain('admin-child works!');
  });

  it('should render "Child1" in an h1 tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    const h1 = compiled.querySelector('h1');
    expect(h1).toBeTruthy();
    expect(h1.textContent).toContain('Child1');
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
