import { Component, OnInit } from '@angular/core';
import{Subscription} from 'rxjs';
import {Router,ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user.service';
// import 'rxjs/add/operator/finally';
import { finalize, first } from 'rxjs/operators';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { CreateSignInUserRequest } from '../CreateSignInUserRequest';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit { 

  loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    errors: string;
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService
    ) {
        // redirect to home if already logged in
        // if (this.authenticationService.currentUserValue) {
        //     this.router.navigate(['/']);
        // }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        this.errors='';
        // reset alerts on submit
        // this.alertService.clear();
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        this.userService.LoginMethod(this.loginForm.value)
            .pipe(first())
            .subscribe(
                data => {
                  if (data) {
                      this.router.navigate(['/Management']);       
                     }
                },
                error => {
                  if(error.error.status==401){
                      this.errors="Invalid username or password "; }
                    // this.alertService.error(error);
                    this.loading = false;
                });
    }
  
 public hasError = (controlName: string, errorName: string) =>{
    return this.loginForm.controls[controlName].hasError(errorName);
  }
  
}




// export interface CreateSignInUserRequest{
//   Username:string;
//   Password:string;
// }