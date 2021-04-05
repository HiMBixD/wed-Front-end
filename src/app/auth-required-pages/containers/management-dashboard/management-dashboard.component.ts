import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';
import { CommonService } from '../../services/common.service';
import { mockExReport, mockNoCommentYet } from '../interfaces/exReport';
import { facultyInterface } from '../interfaces/interfaces';

@Component({
  selector: 'app-management-dashboard',
  templateUrl: './management-dashboard.component.html',
  styleUrls: ['./management-dashboard.component.scss']
})
export class ManagementDashboardComponent implements OnInit {

  constructor(private commonService: CommonService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }
  p: number = 1;
  exReport = mockExReport;
  allFaculties = []

  noCommentYet = mockNoCommentYet;
  sendReminderEmail() {
    
  }
  ngOnInit(): void {
    this.commonService.getFaculties().subscribe(value => {
      if (value.success) {
        this.allFaculties = value.data;
        console.log(this.allFaculties);
        this.getLabels(this.allFaculties)
      }
    });
  }

  /**
   * Get facultyName from list of all Faculties, then push it
   * to pieChartLabels
   * @param facultyList 
   */
  getLabels(facultyList: Array<facultyInterface>) {
    facultyList.forEach(element => {
      let name = element.facultyName;
      // console.log(name);
      let label = ['Department of', `${name}`];
      this.pieChartLabels.push(label);
    });
    console.log(this.pieChartLabels)
  }

  // Pie
  public pieChartOptions: ChartOptions = {
    title: {
      text: 'Total Contributions - 2021',
      display: true
    },
    responsive: true,
    maintainAspectRatio: false,
  };
  // public pieChartLabels: Label[] = [['Department of', 'Computer Science'],
  //   ['Department of', 'Finance'], ['Department of', 'Arts']];
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [25, 30, 17];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
}