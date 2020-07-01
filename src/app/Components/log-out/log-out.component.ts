import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogConfig } from '@angular/material';
import { ReusableModalComponent } from '../reusable-modal/reusable-modal.component';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.scss']
})
export class LogOutComponent implements OnInit {
  constructor(private userService:UserService,private matDialog:MatDialog,private router: Router) { }

  ngOnInit() {
  }

  LogOut(){    
    this.userService.logout();
    this.router.navigate(['/Management']); 
  }
  
}
