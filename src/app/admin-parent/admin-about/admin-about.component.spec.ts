import { TestBed, async } from '@angular/core/testing';
import { AdminAboutComponent } from './admin-about.component';

describe('AdminAboutComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdminAboutComponent
      ],
    }).compileComponents();
  }));

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(AdminAboutComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  }));

  it('should initialize component on ngOnInit', async(() => {
    const fixture = TestBed.createComponent(AdminAboutComponent);
    const component = fixture.debugElement.componentInstance;
    component.ngOnInit();
    expect(component).toBeTruthy();
  }));
});
