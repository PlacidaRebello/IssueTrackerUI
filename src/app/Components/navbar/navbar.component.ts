import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog,MatDialogConfig } from '@angular/material';
// import { ReusableModalComponent } from '../reusable-modal/reusable-modal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private matDialog:MatDialog)
   { }

  // LogOut(){
  //   this.openLogOutModal();
  // }
  // openLogOutModal() {
  //   const dialogConfig = new MatDialogConfig();
  //  // dialogConfig.disableClose = false;
  //   dialogConfig.id = "modal-component";
  //   dialogConfig.height = "150px";
  //   dialogConfig.width = "400px";
  //   dialogConfig.data = {
  //     name: "Logout",
  //     title: "Are you sure you want to Logout?",
  //     actionButtonText: "LogOut",
  //     Id:0
  //   }
  //   const modalDialog = this.matDialog.open(ReusableModalComponent, dialogConfig);
  // }
   

}
