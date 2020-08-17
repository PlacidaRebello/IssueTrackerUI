import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueTrackerService,RegisterClient, RegisterUserRequest } from 'src/app/services/issue-tracker.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registrationForm:FormGroup;
  user:RegisterClient=new RegisterClient(this.http); 

  constructor(private http:HttpClient,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private issueService: IssueTrackerService,private _snackBar:MatSnackBar) { }

  ngOnInit() {    
    this.registrationForm = this.fb.group({
      userName: ['', Validators.required],
      email:['',[Validators.required,Validators.email]],
      password: ['', Validators.required],
      confirmPassword:['',Validators.required],
      userRole:['',Validators.required]
    }, { 
      // validator: ConfirmedValidator('password', 'confirmPassword')
    });  
  }

      // convenience getter for easy access to form fields
  get f() { return this.registrationForm.controls; }
   
  public hasError = (controlName: string, errorName: string) =>{
    return this.registrationForm.controls[controlName].hasError(errorName);
  } 
  
  Clear(){
    this.registrationForm.reset();
  }
  
  register(){
      if(this.registrationForm.valid){
        
        let newUser:RegisterUserRequest=new RegisterUserRequest();        
        newUser.userName=this.registrationForm.value.userName;
        newUser.email=this.registrationForm.value.email;
        newUser.password=this.registrationForm.value.password;
        newUser.confirmPassword=this.registrationForm.value.confirmPassword;
        newUser.userRole=this.registrationForm.value.userRole;
        this.user.createUser(newUser).subscribe(res=>{  
             this._snackBar.open(res.message,"OK",{
              duration:2000,
             })
             this.registrationForm.reset();
             this.router.navigate(['/Login']); 
           },error=>{
             
            this._snackBar.open(error.message,"OK",{
              duration:2000,
           });
        });
      }
  }
  
}

