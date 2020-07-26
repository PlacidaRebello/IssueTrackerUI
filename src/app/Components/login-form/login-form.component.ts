import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { SuccessDialogComponent } from '../shared/dialogs/success-dialog/success-dialog.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  private dialogConfig;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  errors: string;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
    private userService: UserService, private dialog: MatDialog) { }

  ngOnInit() {
    this.createForm();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.initForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  private initForm() {
    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: { title: "User LoggedIn successfully" }
    }
  }
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.errors = '';
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.userService.LoginMethod(this.loginForm.value)
      .pipe(first())
      .subscribe(data => {
        let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);
        dialogRef.afterClosed()
          .subscribe(result => {
          });
        if (data) {
          this.router.navigate(['/Management']);
        }
      }, error => {
        if (error.error.status == 401) {
          this.errors = "Invalid username or password ";
        }
        this.loading = false;
      });
  }

  Clear() {
    this.loginForm.reset();
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

}
