import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputwrapperComponent } from './inputwrapper.component';

describe('InputwrapperComponent', () => {
  let component: InputwrapperComponent;
  let fixture: ComponentFixture<InputwrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputwrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputwrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
