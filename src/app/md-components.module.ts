import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatBadgeModule} from '@angular/material/badge';
import { MatSelectModule } from '@angular/material';




@NgModule({
  exports: [
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatSelectModule
  ]
})
export class MdComponentsModule { }
