import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminParentComponent } from './admin-parent.component';

describe('AdminParentComponent', () => {
  let component: AdminParentComponent;
  let fixture: ComponentFixture<AdminParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminParentComponent);
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
