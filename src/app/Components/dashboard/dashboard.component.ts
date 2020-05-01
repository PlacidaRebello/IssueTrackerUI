import { Component, OnInit } from '@angular/core';
import { IssuesClient } from 'src/app/services/issue-tracker.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  
  baseurl="https://localhost:44322";
  issues:IssuesClient = new IssuesClient(this.http,this.baseurl); 
  public pieChartData;
  public chartReady=false;
  constructor(private route:ActivatedRoute,private router:Router,private http:HttpClient) { }

  ngOnInit() {
    this.getData();
  }
  getData(){
    this.issues.getPoints().subscribe(res=>{
        this.pieChartData=res as number[];
        console.log(this.pieChartData);
        this.chartReady=true;
    });
  }

  chartOptions={
    responsive:true,
    backgroundColor: [
      "#FF6384",
      "#4BC0C0",
      "#FFCE56",]
  }

  labels=['Story','Bug','Task'];
}
