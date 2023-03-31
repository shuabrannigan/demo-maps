import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { FeatureCollectionViewRoutingModule } from './featurecollection-view-routing.module';
import { FeaturecollectionViewComponent } from './featurecollection-view.component';
import { GeoJSONInputComponent } from './geojson-input/geojson-input.component';

@NgModule({
  declarations: [FeaturecollectionViewComponent, GeoJSONInputComponent],
  imports: [CommonModule, SharedModule, FeatureCollectionViewRoutingModule],
})
export class FeatureCollectionViewModule {}
