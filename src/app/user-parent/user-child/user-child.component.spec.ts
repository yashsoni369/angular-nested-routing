import { TestBed, async } from '@angular/core/testing';
import { UserChildComponent } from './user-child.component';

describe('UserChildComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserChildComponent
      ],
    }).compileComponents();
  }));

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(UserChildComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  }));

  it('should initialize component on ngOnInit', async(() => {
    const fixture = TestBed.createComponent(UserChildComponent);
    const component = fixture.debugElement.componentInstance;
    component.ngOnInit();
    expect(component).toBeTruthy();
  }));
});
