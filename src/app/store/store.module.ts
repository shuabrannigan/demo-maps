import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { SharedModule } from '../shared/shared.module';

import * as fromApp from './app-store/app.reducer';
import * as fromGeo from './geo-features/geo.reducer';

const optionalImports = [];

if ((environment as any).storeDevtools) {
  console.warn('StoreDevtoolsModule is enabled');
  optionalImports.push(StoreDevtoolsModule.instrument({ maxAge: 100 }));
}

const StoreModuleArray = [
  StoreModule.forFeature(fromApp.appFeatureKey, fromApp.appReducer),
  StoreModule.forFeature(
    fromGeo.geoFeatureFeatureKey,
    fromGeo.geoFeatureReducer
  ),
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    EffectsModule.forFeature([]),
    ...optionalImports,
    ...StoreModuleArray,
  ],
})
export class RootStoreModule {}
