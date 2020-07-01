import { Component, OnInit,ViewChild, AfterViewInit } from '@angular/core';
import { CreateReleaseRequest, GetReleaseData, Release, ReleasesClient}from 'src/app/services/issue-tracker.service';
import { FormGroup, Validators ,FormBuilder, NgModel} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, MatSort,MatPaginator, MatDialogConfig, MatDialog} from '@angular/material';
import { AddEditReleaseComponent } from '../add-edit-release/add-edit-release.component';
import { ReusableModalComponent } from '../reusable-modal/reusable-modal.component';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class DashboardComponent implements OnInit {
  
  isLoading=true;
  public dataSource = new MatTableDataSource<GetReleaseData>();  
  public columnsToDisplay = ['releaseName', 'startDate','endDate','sprintStatusName','update','delete'];
  release:ReleasesClient = new ReleasesClient(this.http);  
  expandedElement: GetReleaseData | null;

   @ViewChild(MatSort,{static:false}) sort: MatSort;
   @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;   

  constructor(private route:ActivatedRoute,private router:Router,private matDialog:MatDialog,private http:HttpClient)
   {    }

  ngOnInit() {   
      this.getReleaseList();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;    
    this.dataSource.paginator = this.paginator;
  }
  
  getReleaseList() {
    this.release.getReleases().subscribe(res=>{ 
       this.isLoading=false;    
       this.dataSource.data = res as GetReleaseData[];        
    });    
  }

  public redirectToUpdatePage(id):void{  
    const dialogConfig = new MatDialogConfig();
    let model=this.matDialog.open(AddEditReleaseComponent,{ data:{id}});   
    model.afterClosed().subscribe(res=>{
      this.getReleaseList();
    });
  }

  public redirectToDelete(id):void  {
    this.openCofirmationModal(id);
  }

  openModal() {
    const dialogConfig = new MatDialogConfig();   
    let model=this.matDialog.open(AddEditReleaseComponent,{ data:{id:0}});  
    model.afterClosed().subscribe(res=>{
      this.getReleaseList();
    });
  }
 
  openCofirmationModal(id) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "Release-component";
    dialogConfig.height = "150px";
    dialogConfig.width = "400px";
    dialogConfig.data = {
      name: "Release",
      title: "Are you sure you want to Delete?",
      actionButtonText: "Delete",
      Id:id
    }
    let model = this.matDialog.open(ReusableModalComponent, dialogConfig);
    model.afterClosed().subscribe(res=>{      
      this.getReleaseList();
    });
  }
}
