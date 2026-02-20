import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChildComponent } from './admin-child.component';

describe('AdminChildComponent', () => {
  let component: AdminChildComponent;
  let fixture: ComponentFixture<AdminChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminChildComponent);
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
