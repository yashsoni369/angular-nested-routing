import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'angular-child-routing'`, () => {
    expect(component.title).toEqual('angular-child-routing');
  });

  it('should render "Welcome to Nested Routing Tutorial!" in an h1 tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to Nested Routing Tutorial!');
  });

  it('should render "Click on the button to start:" in an h2 tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Click on the button to start:');
  });

  it('should have a navbar with Admin and User links', () => {
    const compiled = fixture.debugElement.nativeElement;
    const navLinks = compiled.querySelectorAll('.nav-link');
    expect(navLinks.length).toBe(2);
    expect(navLinks[0].textContent).toContain('Admin');
    expect(navLinks[1].textContent).toContain('User');
  });

  it('should contain a router-outlet', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  it('should have a navbar brand with text "Navbar"', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.navbar-brand').textContent).toContain('Navbar');
  });

  it('should render "First Router" text in the jumbotron', () => {
    const compiled = fixture.debugElement.nativeElement;
    const jumbotron = compiled.querySelector('.jumbotron');
    expect(jumbotron).toBeTruthy();
    expect(jumbotron.querySelector('h2').textContent).toContain('First Router');
  });
});
