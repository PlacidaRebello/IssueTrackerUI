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
  import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
  import { MatFormFieldModule } from '@angular/material/form-field';


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
    MatSlideToggleModule,MatRadioModule,MatProgressSpinnerModule,
    MatFormFieldModule
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
    MatSlideToggleModule,MatRadioModule,MatProgressSpinnerModule,
    MatFormFieldModule
  ]
})
export class MaterialModule { }
