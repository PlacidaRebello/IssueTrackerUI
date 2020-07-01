import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, 
  MatListModule,
  MatInputModule,
  MatToolbarModule,
  MatTableModule, 
  MatGridListModule, 
  MatSidenavModule,
  MatSortModule,
  MatPaginatorModule,
  MatDatepickerModule, 
  MatNativeDateModule,
  MatDialogModule,
  MatSelectModule,MatButtonModule,
  MatIconModule,MatSnackBarModule,
  MatSlideToggleModule, MatRadioModule } from '@angular/material';
  import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatTableModule,
    MatGridListModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule,    
    MatDatepickerModule, 
    MatNativeDateModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSlideToggleModule,MatRadioModule,MatProgressSpinnerModule
  ],
  exports:[
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatTableModule,
    MatGridListModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule,    
    MatDatepickerModule, 
    MatNativeDateModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSlideToggleModule,MatRadioModule,MatProgressSpinnerModule
  ]
})
export class MaterialModule { }
