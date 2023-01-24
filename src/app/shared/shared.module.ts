import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';

// array of material module imports.
const MaterialModules = [MatToolbarModule]

@NgModule({
  imports: [CommonModule, ...MaterialModules],
  declarations: [],
  exports: [CommonModule, FormsModule, ...MaterialModules],
})
export class SharedModule {}
