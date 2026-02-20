import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../material.module';

import { AdminChildComponent } from './admin-child.component';

describe('AdminChildComponent', () => {
  let component: AdminChildComponent;
  let fixture: ComponentFixture<AdminChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MaterialModule],
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
    component.ngOnInit();
  });

  it('should render "admin-child works!" in a paragraph tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('admin-child works!');
  });

  it('should render "Child1" in an h1 tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Child1');
  });

  it('should have the selector "app-admin-child"', () => {
    const el = fixture.debugElement.nativeElement;
    expect(el.tagName.toLowerCase()).toBe('app-admin-child');
  });

  it('should be wrapped in a mat-card', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-card')).toBeTruthy();
  });
});
