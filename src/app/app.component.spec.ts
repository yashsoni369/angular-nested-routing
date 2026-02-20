import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, NoopAnimationsModule, MaterialModule],
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

  it('should have a mat-toolbar with Admin and User links', () => {
    const compiled = fixture.debugElement.nativeElement;
    const toolbar = compiled.querySelector('mat-toolbar');
    expect(toolbar).toBeTruthy();
    const links = toolbar.querySelectorAll('a[mat-button]');
    expect(links.length).toBe(2);
    expect(links[0].textContent).toContain('Admin');
    expect(links[1].textContent).toContain('User');
  });

  it('should contain a router-outlet', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  it('should have a toolbar brand with text "Nested Routing"', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.toolbar-brand').textContent).toContain('Nested Routing');
  });

  it('should render "First Router" text in a mat-card', () => {
    const compiled = fixture.debugElement.nativeElement;
    const card = compiled.querySelector('mat-card');
    expect(card).toBeTruthy();
    expect(card.querySelector('mat-card-title').textContent).toContain('First Router');
  });
});
