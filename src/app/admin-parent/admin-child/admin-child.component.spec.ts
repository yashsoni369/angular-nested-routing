import { TestBed, async } from '@angular/core/testing';
import { AdminChildComponent } from './admin-child.component';

describe('AdminChildComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdminChildComponent
      ],
    }).compileComponents();
  }));

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(AdminChildComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  }));

  it('should initialize component on ngOnInit', async(() => {
    const fixture = TestBed.createComponent(AdminChildComponent);
    const component = fixture.debugElement.componentInstance;
    component.ngOnInit();
    expect(component).toBeTruthy();
  }));
});
