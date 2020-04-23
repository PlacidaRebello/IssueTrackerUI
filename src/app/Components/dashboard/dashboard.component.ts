import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  chartOptions={
    responsive:true,
    backgroundColor: [
      "#FF6384",
      "#4BC0C0",
      "#FFCE56",]
  }

  labels=['Story','Bug','Task'];

  pieChartData=[30,20,50];
}
