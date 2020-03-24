import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule} from '@angular/material/badge';
import { MatSelectModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';




@NgModule({
  exports: [
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatSelectModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTooltipModule, 
    MatExpansionModule,
    MatDividerModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatTabsModule
  ]
})
export class MdComponentsModule { }
