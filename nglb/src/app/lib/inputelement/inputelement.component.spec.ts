import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputelementComponent } from './inputelement.component';

describe('InputelementComponent', () => {
  let component: InputelementComponent;
  let fixture: ComponentFixture<InputelementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputelementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputelementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
