import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { UserService } from '../../services/user.service';

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
  public name:Observable<string>;
  public role:Observable<string>;
  public LoginStatus:Observable<boolean>;
  constructor(private userService: UserService, private breakpointObserver: BreakpointObserver, private matDialog: MatDialog) { }

  ngOnInit() {
    this.LoginStatus = this.userService.isLoggedIn;
    this.name = this.userService.currentUserName;
    this.role=this.userService.currentUserRole;
  }

}
