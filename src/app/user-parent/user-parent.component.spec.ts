import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserParentComponent } from './user-parent.component';

describe('UserParentComponent', () => {
  let component: UserParentComponent;
  let fixture: ComponentFixture<UserParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserParentComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserParentComponent);
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

  it('should render "user-parent works!" in a paragraph', () => {
    const compiled = fixture.debugElement.nativeElement;
    const paragraph = compiled.querySelector('p');
    expect(paragraph).toBeTruthy();
    expect(paragraph.textContent).toContain('user-parent works!');
  });

  it('should have exactly one paragraph element', () => {
    const compiled = fixture.debugElement.nativeElement;
    const paragraphs = compiled.querySelectorAll('p');
    expect(paragraphs.length).toBe(1);
  });

  it('should not contain a router-outlet', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('router-outlet')).toBeFalsy();
  });
});
