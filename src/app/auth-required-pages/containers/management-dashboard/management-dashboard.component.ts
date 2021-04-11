import {Component, OnInit} from '@angular/core';
import {ChartOptions, ChartType} from 'chart.js';
import {Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet} from 'ng2-charts';
import {mockExReport, mockNoCommentYet} from '../../interfaces/exReport';
import {CommonService} from '../../services/common.service';

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


  constructor(private  commonService: CommonService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  p = 1;
  exReport = mockExReport;
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

  getDataSet(): any {

  }


  ngOnInit(): void {
    this.commonService.getFaculties().subscribe(
      faculty => {
        if (faculty.success) {
          this.facultyList = faculty.data;
          console.log(this.facultyList);
        }
        this.getFacultyLabel();
      });

    this.commonService.searchSubmission({
      username: '',
      assignmentId: null,
      status: 0
    }).subscribe(value => {
      if (value) {
        this.selectedSubmissions = value.data;
        console.log(this.selectedSubmissions);
        this.selectedSubmissions.forEach(el => {
          console.log(el.submissionDate);
          const a = new Date(el.submissionDate);
          console.log(a);
          const b = new Date();
          console.log(b);
          const c = Math.floor((b.getTime() - a.getTime()) / (1000 * 3600 * 24));
          console.log(c);
        });
      }
    });

    this.commonService.searchAssignment({
      facultyId: '',
      username: '',
      deadlineId: ''
    }).subscribe(assignment => {
      if (assignment) {
        this.assignmentList = assignment.data;
      }
    });

    this.commonService.getDeadline({
      deadlineId: ''
    }).subscribe(response => {
      console.log(response.data);
    });
  }
}
