import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';

import { UserParentComponent } from './user-parent.component';

describe('UserParentComponent', () => {
  let component: UserParentComponent;
  let fixture: ComponentFixture<UserParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MaterialModule],
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
    component.ngOnInit();
  });

  it('should render "user-parent works!" in a paragraph tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('user-parent works!');
  });

  it('should have the selector "app-user-parent"', () => {
    const el = fixture.debugElement.nativeElement;
    expect(el.tagName.toLowerCase()).toBe('app-user-parent');
  });

  it('should be wrapped in a mat-card', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-card')).toBeTruthy();
  });
});
