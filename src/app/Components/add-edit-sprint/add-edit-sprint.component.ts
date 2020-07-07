
import { Component, OnInit, Inject, Optional } from '@angular/core';
import { SprintsClient, CreateSprintRequest, EditSprintRequest, GetSprintStatusData, GetReleaseList, ReleasesClient}from 'src/app/services/issue-tracker.service';
import { FormGroup,FormControl, Validators ,FormBuilder} from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDatepickerInputEvent, MatSnackBar, MatDialog } from '@angular/material';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SuccessDialogComponent } from '../shared/dialogs/success-dialog/success-dialog.component';

@Component({
  selector: 'app-aesprint',
  templateUrl: './add-edit-sprint.component.html',
  styleUrls: ['./add-edit-sprint.component.scss']
})
export class AddEditSprintComponent implements OnInit {

  private dialogConfig;
  sprintId:string='';
  minDate:Date;
  minEndDate:Date;
  maxDate:Date;
  editMode = false;isReadOnly;
  pageTitle: string;
  sprintForm:FormGroup;
  AddButton=true;
  sprint:SprintsClient = new SprintsClient(this.http); 
  release:ReleasesClient= new ReleasesClient(this.http);
  public SprintStatus;releases;

  constructor(private location: Location,private fb:FormBuilder,private matDialog:MatDialog,
            public dialogRef: MatDialogRef<AddEditSprintComponent>,private _snackBar:MatSnackBar,
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
    this.sprintId=this.data.id?this.data.id:''
    this.editMode=this.data.id!=0;
    this.isReadOnly=this.editMode;
    this.initForm();
    this.pageTitle=this.editMode?'Edit Sprint':'Add Sprint';  
  }

  sprintStatuslist= this.sprint.getSprintStatusList().subscribe(res=>{    
    this.SprintStatus=res as GetSprintStatusData[];   
  });

  releaseList=this.release.getListOfReleases().subscribe(res=>{
     this.releases=res as GetReleaseList[];
  });

  createForm()
  {
    this.sprintForm=this.fb.group({      
      sprintId:this.sprintId?this.sprintId:'',
      sprintName:['',[Validators.required,Validators.minLength(5)]],
      sprintPoints:['',Validators.required],
      startDate:['',Validators.required],
      endDate:['',Validators.required],
      createdBy:[''],
      sprintStatusId:[''],
      sprintStatusName:'',
      releaseId:['',Validators.required]
    });     
  }

  private initForm()
  {
    if(this.editMode){  
       this.sprint.getSprint(this.data.id).subscribe(res=>{   
         this.sprintForm.setValue(res);         
         //mindate validation gives error if editing after the date entered
         const startdate=res.startDate;
         this.minDate=startdate;
         this.minEndDate=new Date(startdate.getFullYear(),startdate.getMonth(),startdate.getDate()+1);
      });
      this.AddButton=false;
    }
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.sprintForm.controls[controlName].hasError(errorName);
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
    if(this.sprintForm.valid){
      if(!this.editMode){      
        this.createSprint(this.sprintForm.value);
      }else{
        this.updateSprint(this.sprintForm.value);
      } 
    }
  }
 
   createSprint(formvalues){    
       let newSprint: CreateSprintRequest = new CreateSprintRequest();
       newSprint.sprintName = formvalues.sprintName;
       newSprint.sprintPoints = formvalues.sprintPoints;
       newSprint.startDate =formvalues.startDate;
       newSprint.endDate = formvalues.endDate;
       newSprint.sprintStatusId=formvalues.sprintStatusId;
       newSprint.releaseId=formvalues.releaseId;

       this.sprint.postSprint(newSprint).subscribe(res=>{
        this.dialogConfig.data.title="Sprint created successfully";
        let dialogRef = this.matDialog.open(SuccessDialogComponent, this.dialogConfig);
                      dialogRef.afterClosed().subscribe(result => {});  
         },error=>{
          this._snackBar.open(error.message,"OK",{
            duration:2000,
          });
         });
       this.dialogRef.close();
    }

   updateSprint(formvalues)
   {      
      let updateSprint: EditSprintRequest = new EditSprintRequest();      
      updateSprint.sprintName = formvalues.sprintName;
      updateSprint.sprintPoints = formvalues.sprintPoints;
      updateSprint.startDate = formvalues.startDate;
      updateSprint.endDate = formvalues.endDate;
      updateSprint.sprintId=parseInt(this.sprintId);
      updateSprint.sprintStatusId=formvalues.sprintStatusId;
      updateSprint.releaseId=formvalues.releaseId;

      this.sprint.putSprint(updateSprint).subscribe(res=>{
        this.dialogConfig.data.title="Sprint Edited successfully";
        let dialogRef = this.matDialog.open(SuccessDialogComponent, this.dialogConfig);
                      dialogRef.afterClosed().subscribe(result => {});  
        },error=>{
          this._snackBar.open(error.message,"OK",{
            duration:2000,
          });
        });
      this.dialogRef.close();
    }
  
}
