import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';

import { AdminParentComponent } from './admin-parent.component';

describe('AdminParentComponent', () => {
  let component: AdminParentComponent;
  let fixture: ComponentFixture<AdminParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, NoopAnimationsModule, MaterialModule],
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
    component.ngOnInit();
  });

  it('should render "admin-parent Component!" in a paragraph tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('admin-parent Component!');
  });

  it('should render "Default 1st child is Loaded" in an h2 tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Default 1st child is Loaded');
  });

  it('should have a Child button with mat-raised-button', () => {
    const compiled = fixture.debugElement.nativeElement;
    const buttons = compiled.querySelectorAll('button[mat-raised-button]');
    expect(buttons.length).toBe(2);
    expect(buttons[0].textContent).toContain('Child');
  });

  it('should have an About button with mat-raised-button', () => {
    const compiled = fixture.debugElement.nativeElement;
    const buttons = compiled.querySelectorAll('button[mat-raised-button]');
    expect(buttons[1].textContent).toContain('About');
  });

  it('should contain a router-outlet', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  it('should have the selector "app-admin-parent"', () => {
    const el = fixture.debugElement.nativeElement;
    expect(el.tagName.toLowerCase()).toBe('app-admin-parent');
  });

  it('should contain a mat-card for child content', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-card')).toBeTruthy();
  });
});
