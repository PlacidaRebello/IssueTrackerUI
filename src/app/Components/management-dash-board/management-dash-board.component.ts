import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { IssuesClient, GetIssueData, ManagementClient, DragDropIssueRequest, GetIssueCountByType } from 'src/app/services/issue-tracker.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialogConfig, MatDialog, MatSnackBar } from '@angular/material';
import { AddEditIssueComponent } from '../add-edit-issue/add-edit-issue.component';

@Component({
  selector: 'app-management-dash-board',
  templateUrl: './management-dash-board.component.html',
  styleUrls: ['./management-dash-board.component.scss']
})
export class ManagementDashBoardComponent implements OnInit {

  baseurl="https://localhost:44322";
  issues:IssuesClient = new IssuesClient(this.http,this.baseurl); 
  management:ManagementClient= new ManagementClient(this.http,this.baseurl);
  public pieChartData=[];issuesDt;label=[];pieChartOptions;
  public issuesList:GetIssueData[]=[];
  public issueCount:GetIssueCountByType[]=[];
  public chartReady=false;
  constructor(private route:ActivatedRoute,private router:Router,private _snackBar:MatSnackBar,private matDialog:MatDialog,private http:HttpClient) { }

  ngOnInit() {
    this.getIssuesList();
    this.getIssueCountForPieChart();
  }

  getIssuesList()  {   
    this.management.getInitialIssueList().subscribe(res=>{  
      this.issuesList=res as GetIssueData[];
    });    
  }

  getIssueCountForPieChart(){
    this.management.getIssuesCountByType().subscribe(res=>{
      this.issueCount=res as GetIssueCountByType[];
      this.bindPieChart(this.issueCount);
    })
  }

  bindPieChart(issueCount){
     this.pieChartOptions={
      responsive:true,
      backgroundColor: ["#FF6384","#4BC0C0","#FFCE56",]
    } 
    var i:number;
    for(i=0;i<issueCount.length;i++){
      this.label.push(issueCount[i].typeName);
      this.pieChartData.push(issueCount[i].issueCount);
    } 
    this.chartReady=true;
  }
 
  
  drop(event: CdkDragDrop<string[]>) {    
    let updateIssue:DragDropIssueRequest=new DragDropIssueRequest();    
    this.issuesDt=event.container.data;
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    updateIssue.currentItemIndex=event.currentIndex;  
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

  DragDropIssue(updateIssue:DragDropIssueRequest){
    this.management.updateIssuePriority(updateIssue).subscribe(res=>{
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
}
