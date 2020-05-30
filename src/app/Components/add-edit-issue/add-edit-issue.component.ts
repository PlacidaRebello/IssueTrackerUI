import { Component, OnInit,Inject} from '@angular/core';
import { IssuesClient,IssueStatusClient, CreateIssueRequest, EditIssueRequest, GetIssueData, GetIssueStatusData, GetSprintsList
  ,IssueTypesClient, GetIssueTypeData, RegisterClient, GetUsersData, SprintsClient}from 'src/app/services/issue-tracker.service';
import { FormGroup,FormControl, Validators ,FormBuilder} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDatepickerInputEvent, MatSnackBar, MatDialogConfig, MatDialog } from '@angular/material';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ReusableModalComponent } from '../reusable-modal/reusable-modal.component';

@Component({
  selector: 'app-add-edit-issue',
  templateUrl: './add-edit-issue.component.html',
  styleUrls: ['./add-edit-issue.component.scss']
})
export class AddEditIssueComponent implements OnInit {

  issueId:number=0;
  editMode = false;
  pageTitle: string;
  issueForm:FormGroup;
  AddButton=true;
  DeleteButton=false;
  public issueStatusList;issueTypeList;usersList;sprintsList;
  public selectedType:number;

  issue:IssuesClient = new IssuesClient(this.http); 
  issueStatus:IssueStatusClient= new  IssueStatusClient(this.http);
  issueType:IssueTypesClient= new IssueTypesClient(this.http);
  sprint:SprintsClient=new SprintsClient(this.http);
  user:RegisterClient=new RegisterClient(this.http); 
 
  constructor(private http:HttpClient,private fb:FormBuilder,private dialogRef:MatDialogRef<AddEditIssueComponent>,
    private route:ActivatedRoute,private _snackBar:MatSnackBar,@Inject(MAT_DIALOG_DATA)public data:any
    ,private matDialog:MatDialog) { }

  ngOnInit() {    
    this.createForm();
    this.issueId=this.data.id?this.data.id:'';
    this.editMode=this.data.id!=0;
    this.initForm();    
    this.pageTitle=this.editMode?'Edit Issue':'Add Issue';  
  }

  issues=this.issueStatus.getStatusList().subscribe(res=>{
    this.issueStatusList=res as GetIssueStatusData[];
  });
  
  issueTypes=this.issueType.getIssueTypeAll().subscribe(res=>{
    this.issueTypeList=res as GetIssueTypeData[];
  });

  sprints=this.sprint.getListOfSprints().subscribe(res=>{
    this.sprintsList=res as GetSprintsList[];
  });

  users=this.user.getUsers().subscribe(res=>{
    this.usersList=res as GetUsersData[];
  });

  createForm() {
    this.issueForm=this.fb.group({      
      issueId:this.issueId?this.issueId:'',
      subject:['',[Validators.required,Validators.minLength(5)]],     
      description:['',[Validators.required,Validators.minLength(10)]],
      assignedTo:['',[Validators.required,Validators.min(1)]],
      tags:['',Validators.required],
      issueStatusId:['',[Validators.required,Validators.min(1)]],
      statusName:'',
      createdBy:'',
      order:'',
      issueTypeId:['',[Validators.required,Validators.min(1)]],
      issueDetailsId:0,
      attachment:'',
      reporter:[null],
      enviroment:'',
      browser:'',
      acceptanceCriteria:'',
      storyPoints:0,
      epic:0,
      uat:false,
      timeTracking:'',
      sprintId:['',Validators.required]
    });     
  }

  
  private initForm()  {
    if(this.editMode){  
       this.issue.getIssue(this.data.id).subscribe(res=>{
         this.issueForm.setValue(res);
         this.selectedType=res.issueTypeId;
         this.DeleteButton=true;
      });
      this.AddButton=false;
   }
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.issueForm.controls[controlName].hasError(errorName);
  }
  
  closeDialog(){ 
    this.dialogRef.close(); 
  }
  
  onSubmit(){
    if(this.issueForm.valid){
      if(!this.editMode){       
        this.createIssue(this.issueForm.value);
      }else{
        this.updateIssue(this.issueForm.value);
      } 
    }
   }
 
   createIssue(formvalues){   
       let newIssue: CreateIssueRequest = new CreateIssueRequest();
       newIssue.subject = formvalues.subject;
       newIssue.description =formvalues.description;
       newIssue.assignedTo = formvalues.assignedTo;
       newIssue.tags = formvalues.tags;
       newIssue.issueStatusId=formvalues.issueStatusId;
       newIssue.issueTypeId=formvalues.issueTypeId;
       newIssue.attachment=formvalues.attachment;
       newIssue.reporter=formvalues.reporter;
       newIssue.enviroment=formvalues.enviroment;
       newIssue.browser=formvalues.browser;
       newIssue.acceptanceCriteria=formvalues.acceptanceCriteria;
       newIssue.storyPoints=formvalues.storyPoints;
       newIssue.epic=formvalues.epic;       
       newIssue.uat=formvalues.uat;
       newIssue.timeTracking=formvalues.timeTracking;
       newIssue.sprintId=formvalues.sprintId;
       this.issue.postIssue(newIssue).subscribe(res=>{           
           this._snackBar.open(res.message,"OK",{
             duration:2000,
           });
         },error=>{
          this._snackBar.open(error.message,"OK",{
            duration:2000,
          });
         }
       );
       this.dialogRef.close();
   }

   updateIssue(formvalues) {    
      let updateIssue: EditIssueRequest = new EditIssueRequest();      
      updateIssue.subject = formvalues.subject;
      updateIssue.description = formvalues.description;
      updateIssue.assignedTo = formvalues.assignedTo;      
      updateIssue.tags = formvalues.tags;
      updateIssue.issueId=this.issueId;
      updateIssue.issueStatusId=formvalues.issueStatusId;
      updateIssue.issueTypeId=formvalues.issueTypeId;
      updateIssue.attachment=formvalues.attachment;
      updateIssue.reporter=formvalues.reporter;
      updateIssue.enviroment=formvalues.enviroment;
      updateIssue.browser=formvalues.browser;
      updateIssue.acceptanceCriteria=formvalues.acceptanceCriteria;
      updateIssue.storyPoints=formvalues.storyPoints;
      updateIssue.epic=formvalues.epic;       
      updateIssue.uat=formvalues.uat;
      updateIssue.timeTracking=formvalues.timeTracking;
      updateIssue.issueDetailsId=formvalues.issueDetailsId; 
      updateIssue.sprintId=formvalues.sprintId;
      this.issue.putIssue(updateIssue).subscribe(res=>{
          this._snackBar.open(res.message,"OK",{
            duration:2000,
          });
        },error=>{this._snackBar.open(error.message,"OK",{
          duration:2000,
        });
        }
      );
      this.dialogRef.close();
   }

   Delete(issueId):void {      
    this.openCofirmationModal(issueId);
   }

    
  openCofirmationModal(id) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "Issue-component";
    dialogConfig.height = "150px";
    dialogConfig.width = "400px";
    dialogConfig.data = {
      name: "Issue",
      title: "Are you sure you want to Delete?",
      actionButtonText: "Delete",
      Id:id
    }
    const modalDialog = this.matDialog.open(ReusableModalComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(res=>{    
      this.dialogRef.close();
    });
  }
}
