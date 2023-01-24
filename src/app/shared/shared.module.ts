import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { MaterialModule } from './material.module';

@NgModule({
  imports: [CommonModule, MaterialModule, NgxMapboxGLModule],
  declarations: [],
  exports: [CommonModule, FormsModule, MaterialModule, NgxMapboxGLModule],
})
export class SharedModule {}
