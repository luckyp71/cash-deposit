import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule,
MatTableModule, MatFormFieldModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule,
MatMenuModule, MatInputModule, MatProgressBarModule, MatSelectModule, MatAutocompleteModule} from '@angular/material';

@NgModule({
  imports: [MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule,
              MatMenuModule, MatTableModule, MatFormFieldModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule,
              MatInputModule, MatProgressBarModule, MatSelectModule, MatAutocompleteModule],
  exports: [MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule,
              MatMenuModule, MatTableModule, MatFormFieldModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule,
            MatInputModule, MatProgressBarModule, MatSelectModule, MatAutocompleteModule]
})
export class MaterialModule { }
