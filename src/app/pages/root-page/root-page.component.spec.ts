import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/shared/material.module';

import { RootPageComponent } from './root-page.component';

describe('RootPageComponent', () => {
  let component: RootPageComponent;
  let fixture: ComponentFixture<RootPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RootPageComponent ],
      imports: [RouterTestingModule, MaterialModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RootPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('render mat-toolbar', () => {
    let mat_toolbar = fixture.nativeElement.querySelector('[data-test="mat-toolbar"]')
    expect(mat_toolbar).toBeTruthy()
  })

  it('render feature viewer button', () => {
    let featureViewerButton = fixture.nativeElement.querySelector('[data-test="feature-viewer"]')
    expect(featureViewerButton).toBeTruthy()
  })

  it('render linear reference button', () => {
    let linearReferenceButton = fixture.nativeElement.querySelector('[data-test="linear-reference"]')
    expect(linearReferenceButton).toBeTruthy()
  })
});
