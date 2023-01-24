import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturecollectionViewComponent } from './featurecollection-view.component';

describe('FeaturecollectionViewComponent', () => {
  let component: FeaturecollectionViewComponent;
  let fixture: ComponentFixture<FeaturecollectionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturecollectionViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturecollectionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
