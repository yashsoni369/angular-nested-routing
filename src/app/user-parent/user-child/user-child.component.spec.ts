import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserChildComponent } from './user-child.component';

describe('UserChildComponent', () => {
  let component: UserChildComponent;
  let fixture: ComponentFixture<UserChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserChildComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChildComponent);
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

  it('should render "user-child works!" in a paragraph', () => {
    const compiled = fixture.debugElement.nativeElement;
    const paragraph = compiled.querySelector('p');
    expect(paragraph).toBeTruthy();
    expect(paragraph.textContent).toContain('user-child works!');
  });

  it('should have exactly one paragraph element', () => {
    const compiled = fixture.debugElement.nativeElement;
    const paragraphs = compiled.querySelectorAll('p');
    expect(paragraphs.length).toBe(1);
  });
});
