import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { IssuesClient, GetIssueData, GetSprintData, DragDropIssueRequest } from 'src/app/services/issue-tracker.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AddEditIssueComponent } from '../add-edit-issue/add-edit-issue.component';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit{
   
  baseurl="https://localhost:44322";
  issues:IssuesClient = new IssuesClient(this.http,this.baseurl); 
  public issueList;  
  public TodoList:GetIssueData[]=[];
  public InProgressList:GetIssueData[]=[];
  public CompletedList:GetIssueData[]=[];
  public issuesDt;
  public ProgessListId;ToDoListId;CompletedListId;

  constructor(private route:ActivatedRoute,private router:Router,
    private matDialog:MatDialog,private _snackBar:MatSnackBar,
    private http:HttpClient) {     }

  ngOnInit() {
      this.getIssuesList();
  }

  getIssuesList()  {
   
    this.issues.getIssueList().subscribe(res=>{  
      this.issueList=res as GetIssueData[];  
      this.SortIssues(this.issueList);  
    });    
  }

  SortIssues(issueList)
  {
    var i:number;
    var count=issueList.length;
    this.TodoList=[];
    this.InProgressList=[];
    this.CompletedList=[];

    for(i=0;i<count;i++)
    {
      if(issueList[i].statusName=="TODO"){        
        this.TodoList.push(issueList[i]);
        this.ToDoListId=issueList[i].issueStatusId;
      }else if(issueList[i].statusName=="IN PROGRESS"){        
        this.InProgressList.push(issueList[i]);
        this.ProgessListId=issueList[i].issueStatusId;
      }else if(issueList[i].statusName=="COMPLETED"){        
        this.CompletedList.push(issueList[i]);
        this.CompletedListId=issueList[i].issueStatusId;
      }
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    let updateIssue:DragDropIssueRequest=new DragDropIssueRequest();
    this.issuesDt=event.container.data;

    if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      
        updateIssue.currentItemIndex=event.currentIndex;  
        updateIssue.issueStatus=this.issuesDt[event.currentIndex].issueStatusId;
        updateIssue.issueId=this.issuesDt[event.currentIndex].issueId;

         if(event.currentIndex!=0){
           updateIssue.prevItem=true;
           updateIssue.prevItemId=this.issuesDt[event.currentIndex-1].issueId;
         }
         else{          
           updateIssue.prevItem=false;
           updateIssue.prevItemId=0;
         }

         if(this.issuesDt[event.currentIndex+1]){
           updateIssue.nextItemId=this.issuesDt[event.currentIndex+1].issueId;
         }
         else{          
           updateIssue.nextItemId=0;
         }
         
        this.DragDropIssue(updateIssue);
    } 
    else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      updateIssue.currentItemIndex=event.currentIndex;  
      updateIssue.issueId=this.issuesDt[event.currentIndex].issueId;
      
        if(event.currentIndex!=0){
             updateIssue.prevItem=true;
             updateIssue.prevItemId=this.issuesDt[event.currentIndex-1].issueId;            
             updateIssue.issueStatus=this.issuesDt[event.currentIndex-1].issueStatusId;
        }
        else{          
          updateIssue.prevItem=false;
          updateIssue.prevItemId=0;          
          updateIssue.issueStatus=this.issuesDt[event.currentIndex+1].issueStatusId;          
        }

        if(this.issuesDt[event.currentIndex+1]){
          updateIssue.nextItemId=this.issuesDt[event.currentIndex+1].issueId;
        }
        else{          
          updateIssue.nextItemId=0;
        }  

//         if(updateIssue.prevItemId==0 && updateIssue.nextItemId==0)
//         {
//           updateIssue.issueStatus=this.issuesDt.id;
//         }  

// console.log(updateIssue.issueStatus,event.container.id);

        //backened call
       this.DragDropIssue(updateIssue);
    }
  } 

  DragDropIssue(updateIssue:DragDropIssueRequest){
    this.issues.dragIssue(updateIssue).subscribe(res=>{
      this._snackBar.open(res.message,"Moved Successfully",{
        duration:2000,
      });
      this.getIssuesList();
    },error=>{
        this._snackBar.open(error.message,"OK",{
           duration:2000,  });
    });
  }
  
  public redirectToUpdatePage(id):void{     
    const dialogConfig = new MatDialogConfig();
    let model= this.matDialog.open(AddEditIssueComponent,{ data:{id}});   
    model.afterClosed().subscribe(res=>{
         this.getIssuesList();
      });
  }

  openModal() {
    const dialogConfig = new MatDialogConfig();   
    let model=this.matDialog.open(AddEditIssueComponent,{ data:{id:0}});  
    model.afterClosed().subscribe(res=>{
      this.getIssuesList();
    });
  }

}
