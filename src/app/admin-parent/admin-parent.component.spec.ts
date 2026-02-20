import { TestBed, async } from '@angular/core/testing';
import { AdminParentComponent } from './admin-parent.component';

describe('AdminParentComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdminParentComponent
      ],
    }).compileComponents();
  }));

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(AdminParentComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  }));

  it('should initialize component on ngOnInit', async(() => {
    const fixture = TestBed.createComponent(AdminParentComponent);
    const component = fixture.debugElement.componentInstance;
    component.ngOnInit();
    expect(component).toBeTruthy();
  }));
});
