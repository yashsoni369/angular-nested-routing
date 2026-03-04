import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AdminParentComponent } from './admin-parent.component';

describe('AdminParentComponent', () => {
  let component: AdminParentComponent;
  let fixture: ComponentFixture<AdminParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminParentComponent],
      imports: [RouterTestingModule]
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

  it('should render admin parent heading', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('admin-parent Component!');
  });

  it('should include child routing buttons', () => {
    const compiled = fixture.debugElement.nativeElement;
    const buttons = compiled.querySelectorAll('button');
    expect(buttons.length).toBe(2);
    expect(buttons[0].textContent).toContain('Child');
    expect(buttons[1].textContent).toContain('About');
  });
});
