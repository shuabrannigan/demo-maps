import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';



// array of material module imports.
const MaterialModulesArray = [MatToolbarModule, MatIconModule, MatButtonModule];

@NgModule({
    imports: [...MaterialModulesArray],
    declarations: [],
    exports: [...MaterialModulesArray],
  })
  export class MaterialModule {}