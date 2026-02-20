import { TestBed, async } from '@angular/core/testing';
import { UserParentComponent } from './user-parent.component';

describe('UserParentComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserParentComponent
      ],
    }).compileComponents();
  }));

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(UserParentComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  }));

  it('should initialize component on ngOnInit', async(() => {
    const fixture = TestBed.createComponent(UserParentComponent);
    const component = fixture.debugElement.componentInstance;
    component.ngOnInit();
    expect(component).toBeTruthy();
  }));
});
