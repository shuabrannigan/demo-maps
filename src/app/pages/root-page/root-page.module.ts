import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootPageComponent } from './root-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RootPageRoutingModule } from './root-page-routing.module';

@NgModule({
  declarations: [RootPageComponent],
  imports: [CommonModule, SharedModule, RootPageRoutingModule],
})
export class RootPageModule {}
