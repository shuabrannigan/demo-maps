import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { SharedModule } from '../shared/shared.module';

import { appFeature } from './app-store/app.reducer';
import { GeoFeatureEffects } from './geo-features/geo.effects';
import { geoFeatureCollectionFeature } from './geo-features/geo.reducer';

const optionalImports = [];

if ((environment as any).storeDevtools) {
  console.warn('StoreDevtoolsModule is enabled');
  optionalImports.push(StoreDevtoolsModule.instrument({ maxAge: 100 }));
}

const StoreModuleArray = [
  StoreModule.forFeature(appFeature),
  StoreModule.forFeature(geoFeatureCollectionFeature),
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    EffectsModule.forFeature([GeoFeatureEffects]),
    ...optionalImports,
    ...StoreModuleArray,
  ],
})
export class RootStoreModule {}
