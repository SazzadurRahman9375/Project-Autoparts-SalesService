import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatTabsModule} from '@angular/material/tabs';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatProgressBarModule} from '@angular/material/progress-bar';

const modules= [
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatDialogModule,
  MatDatepickerModule,
  MatSelectModule,
  MatRadioModule,
  MatTabsModule,
  MatAutocompleteModule,
  MatProgressBarModule
];




@NgModule({
  declarations: [],
  imports: [
    CommonModule, ...modules
  ],
  exports:[...modules]
})
export class MatImportModule { }
