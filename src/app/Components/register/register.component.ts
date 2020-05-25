import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueTrackerService } from 'src/app/services/issue-tracker.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registrationForm:FormGroup;
  registerForm:FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private issueService: IssueTrackerService) { }

  ngOnInit() {    
    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      email:['',[Validators.required,Validators.email]],
      password: ['', Validators.required],
      confirmPassword:['',Validators.required]
    }, { 
      validator: ConfirmedValidator('password', 'confirmPassword')
    });  
  }

      // convenience getter for easy access to form fields
  get f() { return this.registrationForm.controls; }
   
  public hasError = (controlName: string, errorName: string) =>{
    return this.registrationForm.controls[controlName].hasError(errorName);
  }  
  
}

export function ConfirmedValidator(controlName: string, matchingControlName: string){
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
          return;
      }

      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ confirmedValidator: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
} 
