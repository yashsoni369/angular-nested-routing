import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../material.module';

import { UserChildComponent } from './user-child.component';

describe('UserChildComponent', () => {
  let component: UserChildComponent;
  let fixture: ComponentFixture<UserChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MaterialModule],
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
    component.ngOnInit();
  });

  it('should render "user-child works!" in a paragraph tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('user-child works!');
  });

  it('should have the selector "app-user-child"', () => {
    const el = fixture.debugElement.nativeElement;
    expect(el.tagName.toLowerCase()).toBe('app-user-child');
  });

  it('should be wrapped in a mat-card', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-card')).toBeTruthy();
  });
});
