import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminParentComponent } from './admin-parent.component';

describe('AdminParentComponent', () => {
  let component: AdminParentComponent;
  let fixture: ComponentFixture<AdminParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AdminParentComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminParentComponent);
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

  it('should render "admin-parent Component!" in a paragraph', () => {
    const compiled = fixture.debugElement.nativeElement;
    const paragraph = compiled.querySelector('p');
    expect(paragraph).toBeTruthy();
    expect(paragraph.textContent).toContain('admin-parent Component!');
  });

  it('should render "Default 1st child is Loaded" in an h2 tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    const h2 = compiled.querySelector('h2');
    expect(h2).toBeTruthy();
    expect(h2.textContent).toContain('Default 1st child is Loaded');
  });

  it('should have a Child button with routerLink to ./achild', () => {
    const compiled = fixture.debugElement.nativeElement;
    const buttons = compiled.querySelectorAll('button');
    expect(buttons.length).toBe(2);
    expect(buttons[0].textContent).toContain('Child');
  });

  it('should have an About button with routerLink to ./aabout', () => {
    const compiled = fixture.debugElement.nativeElement;
    const buttons = compiled.querySelectorAll('button');
    expect(buttons[1].textContent).toContain('About');
  });

  it('should contain a router-outlet for child routes', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  it('should have a jumbotron container wrapping the router-outlet', () => {
    const compiled = fixture.debugElement.nativeElement;
    const jumbotron = compiled.querySelector('.jumbotron');
    expect(jumbotron).toBeTruthy();
    expect(jumbotron.querySelector('router-outlet')).toBeTruthy();
  });

  it('should have buttons with btn-primary class', () => {
    const compiled = fixture.debugElement.nativeElement;
    const buttons = compiled.querySelectorAll('button.btn.btn-primary');
    expect(buttons.length).toBe(2);
  });
});
