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
    component.ngOnInit();
  });

  it('should render "admin-about works!" in a paragraph tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('admin-about works!');
  });

  it('should render "Child2" in an h1 tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Child2');
  });

  it('should have the selector "app-admin-about"', () => {
    const el = fixture.debugElement.nativeElement;
    expect(el.tagName.toLowerCase()).toBe('app-admin-about');
  });
});
