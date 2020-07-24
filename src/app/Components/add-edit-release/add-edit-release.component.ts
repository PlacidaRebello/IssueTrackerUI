import { Component, OnInit,Inject } from '@angular/core';
import { ReleasesClient,SprintsClient, CreateReleaseRequest, EditReleaseRequest, GetSprintStatusData}from 'src/app/services/issue-tracker.service';
import { FormGroup,FormControl, Validators ,FormBuilder} from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDatepickerInputEvent, MatSnackBar } from '@angular/material';
import { MatDialog} from '@angular/material';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SuccessDialogComponent } from '../shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
  selector: 'app-add-edit-release',
  templateUrl: './add-edit-release.component.html',
  styleUrls: ['./add-edit-release.component.scss']
})
export class AddEditReleaseComponent implements OnInit {
  
  private dialogConfig;
  releaseId:number=0;
  minDate:Date;
  minEndDate:Date;
  maxDate:Date;
  editMode = false;isReadOnly;
  pageTitle: string;
  releaseForm:FormGroup;
  AddButton=true;
  release:ReleasesClient = new ReleasesClient(this.http); 
  sprint:SprintsClient= new  SprintsClient(this.http);
  public SprintStatus;

  constructor(private location: Location,private fb:FormBuilder,private dialog:MatDialog,private errorService:ErrorHandlerService,
            public dialogRef: MatDialogRef<AddEditReleaseComponent>,private _snackBar:MatSnackBar,
             @Inject(MAT_DIALOG_DATA)public data:any,private route:ActivatedRoute,private http:HttpClient)
  {
    const currentYear = new Date().getFullYear();
      const today=new Date().getDate();
      const month=new Date().getMonth();
      this.minDate = new Date(currentYear , month, today);
      this.maxDate = new Date(currentYear + 1, 11, 31);
      this.minEndDate=new Date(currentYear , month, today);
  }

  ngOnInit() {     
    this.createForm();
    this.releaseId=this.data.id?this.data.id:'';
    this.editMode=this.data.id!=0;
    this.isReadOnly=this.editMode;
    this.initForm();    
    this.pageTitle=this.editMode?'Edit Release':'Add Release';  
  }

  sprintStatuslist= this.sprint.getSprintStatusList().subscribe(res=>{
    this.SprintStatus=res as GetSprintStatusData[];   
  });

  createForm() {
    this.releaseForm=this.fb.group({      
      releaseId:this.releaseId?this.releaseId:'',
      releaseName:['',[Validators.required,Validators.minLength(5)]],     
      startDate:'',
      endDate:'',
      createdBy:'',
      sprintStatusId:[''],
      sprintStatusName:''
    });     
  }

  private initForm()  {
    if(this.editMode){  
       this.release.getRelease(this.data.id).subscribe(res=>{
         this.releaseForm.setValue(res);
         //mindate validation gives error if editing after the date entered
         const startdate=res.startDate;
         this.minDate=startdate;
         this.minEndDate=new Date(startdate.getFullYear(),startdate.getMonth(),startdate.getDate()+1);
      });
      this.AddButton=false;
    }
    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: { }
    }
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.releaseForm.controls[controlName].hasError(errorName);
  }
  
  closeDialog(){ 
    this.dialogRef.close(); 
  }
  
  addEvent(event: MatDatepickerInputEvent<Date>) {
    const startDate=event.value.getDate();
    const curentyear=event.value.getFullYear();
    const currentMonth=event.value.getMonth();
    this.minEndDate=new Date(curentyear,currentMonth,startDate+1);    
  }
    
  onSubmit(){
    if(this.releaseForm.valid){
      if(!this.editMode){       
        this.createRelease(this.releaseForm.value);
      }else{
        this.updateRelease(this.releaseForm.value);
      } 
    }
   }
 
   createRelease(formvalues){   
       let newRelease: CreateReleaseRequest = new CreateReleaseRequest();
       newRelease.releaseName = formvalues.releaseName;
       newRelease.startDate =formvalues.startDate;
       newRelease.endDate = formvalues.endDate;
       newRelease.sprintStatusId=formvalues.sprintStatusId;
       this.release.postRelease(newRelease).subscribe(res=>{  
         this.dialogConfig.data.title="Release created successfully";
        let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);
                         dialogRef.afterClosed().subscribe(result => {});  
          },(error=>{
            this.errorService.dialogConfig = { ...this.dialogConfig };
            this.errorService.handleError(error);
          })
       );
       this.dialogRef.close();
   }

   updateRelease(formvalues) {      
      let updateRelease: EditReleaseRequest = new EditReleaseRequest();      
      updateRelease.releaseName = formvalues.releaseName;
      updateRelease.startDate = formvalues.startDate;
      updateRelease.endDate = formvalues.endDate;
      updateRelease.releaseId=this.releaseId;
      updateRelease.sprintStatusId=formvalues.sprintStatusId;

      this.release.putRelease(updateRelease).subscribe(res=>{
        this.dialogConfig.data.title="Release edited successfully";
        let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);
        dialogRef.afterClosed()
          .subscribe(result => {
          });  
        },error=>{this._snackBar.open(error.message,"OK",{
          duration:2000,
        });
      });
      this.dialogRef.close();
   }
}
