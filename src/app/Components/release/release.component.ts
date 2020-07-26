import { Component, OnInit,ViewChild, AfterViewInit } from '@angular/core';
import {  GetReleaseData, ReleasesClient}from 'src/app/services/issue-tracker.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, MatSort,MatPaginator, MatDialogConfig, MatDialog} from '@angular/material';
import { AddEditReleaseComponent } from '../add-edit-release/add-edit-release.component';
import { ReusableModalComponent } from '../reusable-modal/reusable-modal.component';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-release',
  templateUrl: './release.component.html',
  styleUrls: ['./release.component.scss']
})
export class ReleaseComponent implements OnInit {

  isLoading=true;
  public dataSource = new MatTableDataSource<GetReleaseData>();
  
  public displayedColumns = ['releaseName', 'startDate','endDate','sprintStatusName','update','delete'];
  release:ReleasesClient = new ReleasesClient(this.http);

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
    const modalDialog = this.matDialog.open(ReusableModalComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(res=>{      
      this.getReleaseList();
    });
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}

