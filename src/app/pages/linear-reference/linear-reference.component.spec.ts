import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinearReferenceComponent } from './linear-reference.component';

describe('LinearReferenceComponent', () => {
  let component: LinearReferenceComponent;
  let fixture: ComponentFixture<LinearReferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinearReferenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinearReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
