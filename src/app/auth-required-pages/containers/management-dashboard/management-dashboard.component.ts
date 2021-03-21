import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';
import { mockExReport, mockNoCommentYet } from '../interface mock data/exReport';

@Component({
  selector: 'app-management-dashboard',
  templateUrl: './management-dashboard.component.html',
  styleUrls: ['./management-dashboard.component.scss']
})
export class ManagementDashboardComponent implements OnInit {

  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }
  p: number = 1;
  exReport = mockExReport;

  noCommentYet = mockNoCommentYet;
  sendReminderEmail() {
    
  }
  ngOnInit(): void {
  }

  // Pie
  public pieChartOptions: ChartOptions = {
    title: {
      text: 'Total Contributions - 2021',
      display: true
    },
    responsive: true,
  };
  public pieChartLabels: Label[] = [['Department of', 'Computer Science'],
    ['Department of', 'Finance'], ['Department of', 'Arts']];
  public pieChartData: SingleDataSet = [25, 30, 17];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
}
