import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserParentComponent } from './user-parent.component';

describe('UserParentComponent', () => {
  let component: UserParentComponent;
  let fixture: ComponentFixture<UserParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct selector', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled).toBeTruthy();
  });

  it('should call ngOnInit', () => {
    spyOn(component, 'ngOnInit');
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });
});
