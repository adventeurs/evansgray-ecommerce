import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule} from '@angular/material/badge';
import { MatSelectModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  exports: [
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatSelectModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTooltipModule
  ]
})
export class MdComponentsModule { }
