import {Component, OnInit} from '@angular/core';
import {ChartOptions, ChartType} from 'chart.js';
import {Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet} from 'ng2-charts';
import {mockNoCommentYet} from '../../interfaces/exReport';
import {CommonService} from '../../services/common.service';
import {exReport} from '../../interfaces/exReport';
import {assignment} from '../../interfaces/assignment';

@Component({
  selector: 'app-management-dashboard',
  templateUrl: './management-dashboard.component.html',
  styleUrls: ['./management-dashboard.component.scss']
})
export class ManagementDashboardComponent implements OnInit {
  private facultyName: any;
  private selectedSubmissions: any;
  private assignmentList: any;
  private submissionList: any;
  private deadlineId: any;
  private assignment: assignment;


  constructor(private commonService: CommonService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  p = 1;
  exReport: exReport;
  noCommentYet = mockNoCommentYet;
  facultyList: any;
  currentYear = new Date().getFullYear();
  public pieChartOptions: ChartOptions = {
    title: {
      text: `Total Contributions - ${this.currentYear}`,
      display: true
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [25, 30, 17, 15, 16];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];


  getFacultyLabel(): any {
    if (this.facultyList) {
      this.pieChartLabels = this.facultyList.map(faculty => {
        return ['Department of', `${faculty.facultyName}`];
      });
      console.log(this.pieChartLabels);
    }
  }


  /**getDaySinceSub(): any {

    console.log(this.assignmentList[0]);
    const a = new Date(this.assignmentList[0].assignment.deadline.endDate);
    console.log(a);
    const b = new Date();
    console.log(b);
    const c = Math.floor((b.getTime() - a.getTime()) / (1000 * 3600 * 24));
    console.log(c);
    console.log(b < a);
  }*/



  ngOnInit(): void {
    this.commonService.searchAssignment({
      facultyId: null,
      username: '',
      deadlineId: null
    }).subscribe(el => {
      this.assignmentList = el.data;
      console.log(this.assignmentList);
    });

    this.commonService.getDeadline({
      deadlineId: this.deadlineId
    }).subscribe(response => {
      console.log(response.data);
    });
  }
}
