/* tslint:disable:no-shadowed-variable */
import {Component, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet} from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {CommonService} from '../../services/common.service';
import {assignment} from '../../interfaces/assignment';

@Component({
  selector: 'app-management-dashboard',
  templateUrl: './management-dashboard.component.html',
  styleUrls: ['./management-dashboard.component.scss']
})
export class ManagementDashboardComponent implements OnInit {
  private facultyName: any;
  private assignmentList: any;
  public submissionList: any;
  private assignment: assignment;
  public overDueSub = [];
  public notCommentedYet = [];
  public AcceptedSubmission = [];
  public RejectedSubmission = [];

  constructor(private commonService: CommonService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  public acceptedSubmissionPage = 1;
  public overDueSubPage = 1;
  public notCommentedYetPage = 1;
  public rejectedSubmissionPage = 1;
  private facultyList = [];
  private currentYear = new Date().getFullYear();

  public pieChartOptions: ChartOptions = {
    title: {
      text: `Total Contributions - ${this.currentYear}`,
      display: true
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {

          let sum = 0;
          const dataArr: any = ctx.chart.data.datasets[0].data;
          dataArr.map(data => {
            sum += data;
          });
          const percentage = ((value * 100) / sum).toFixed(2) + '%';
          return percentage;
        },
        align: 'end'
      }
    },
    responsive: true,
    maintainAspectRatio: false,
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors: Array<any> = [{
    backgroundColor: [
      'rgb(255,161,181)',
      'rgb(134,199,243)',
      'rgb(255,226,154)',
      'rgb(113,129,201)',
      'rgb(255,161,181)',
      'rgb(205,142,66)'],
  }];


  public stackedBarChartOptions: ChartOptions = {
    title: {
      text: `Total Contributions - ${this.currentYear}`,
      display: true
    },
    responsive: true,
    maintainAspectRatio: false,

  };
  public stackedBarChartLabels: Label[] = [];
  public stackedBarChartType: ChartType = 'bar';
  public stackedBarChartLegend = true;
  public stackedBarChartPlugins = [pluginDataLabels];
  public stackedBarChartData: ChartDataSets[] = [
    {data: [], label: 'Accepted submissions', stack: 'a'},
    {data: [], label: 'Rejected submissions', stack: 'a'}
  ];

  getFacultyChart(): any {
    if (this.facultyList) {
      // console.log(this.pieChartLabels);
      // console.log(this.facultyList);
      this.facultyList.forEach(faculty => {
        this.commonService.getSubmissionCount({
          facultyId: faculty.facultyId,
        }).subscribe(response => {
          if (response.success && response.data && response.data.length !== 0) {
            this.pieChartData.push(response.data.length);
            this.pieChartLabels.push([`Department of ${faculty.facultyName}`]);
            this.stackedBarChartLabels.push([`Department of ${faculty.facultyName}`]);
          }
        });
      });
      console.log(this.pieChartData);
      console.log(this.pieChartLabels);
      console.log(this.stackedBarChartLabels);
    }
  }

  ngOnInit(): void {
    this.commonService.searchAssignment({
      facultyId: null,
      username: '',
      deadlineId: null
    }).subscribe(response => {
      this.assignmentList = response.data;
      // console.log(this.assignmentList);

      this.commonService.getFaculties().subscribe(response => {
        this.facultyList = response.data;
        this.getFacultyChart();
        // console.log(this.facultyList);

        this.commonService.searchSubmission({
          username: '',
          assignmentId: null,
          status: null
        }).subscribe(response => {
          this.submissionList = response.data;
          console.log(this.submissionList);

          this.submissionList.forEach(submission => {
            this.assignmentList.forEach(assignment => {
              if (submission.assignmentId === assignment.assignment.assignmentId) {
                submission.facultyId = assignment.assignment.facultyId;
                submission.assignmentName = assignment.assignment.assignmentName;
                submission.deadline = assignment.assignment.deadline;
                this.facultyList.forEach(faculty => {
                  if (faculty.facultyId === submission.facultyId) {
                    submission.facultyName = faculty.facultyName;
                  }
                });
              }
            });
          });
          // console.log(this.submissionList);

          this.submissionList.forEach(submission => {

            const endDate = new Date(submission.deadline.endDate);
            const currentDate = new Date();
            const startDate = new Date(submission.deadline.startDate);
            const submissionDate = new Date(submission.submissionDate);

            if (startDate.getFullYear() === currentDate.getFullYear()) {

              switch (submission.status) {
                case 0:
                  if (currentDate.getTime() - endDate.getTime() > 14) {

                    submission.daysOverdue = Math.floor((currentDate.getTime() - endDate.getTime()) / (1000 * 3600 * 24));
                    this.overDueSub.push(submission);

                  } else if (currentDate.getTime() - endDate.getTime() < 14) {

                    submission.daysSinceSubs = Math.floor((currentDate.getTime() - submissionDate.getTime()) / (1000 * 3600 * 24));
                    this.notCommentedYet.push(submission);
                  }
                  break;

                case 1:
                  this.AcceptedSubmission.push(submission);
                  submission.daysSinceSubs = Math.floor((currentDate.getTime() - submissionDate.getTime()) / (1000 * 3600 * 24));
                  break;

                case 2:
                  this.RejectedSubmission.push(submission);
                  submission.daysSinceSubs = Math.floor((currentDate.getTime() - submissionDate.getTime()) / (1000 * 3600 * 24));
                  break;

                default:
                  break;
              }
            }
          });

          this.facultyList.forEach(faculty => {
            let acceptedSubmissionCount = 0;
            let rejectedSubmissionCount = 0;
            this.AcceptedSubmission.forEach(element => {
              if (faculty.facultyId === element.facultyId) {
                acceptedSubmissionCount += 1;
              }
            });
            this.RejectedSubmission.forEach((element => {
              if (faculty.facultyId === element.facultyId) {
                rejectedSubmissionCount += 1;
              }
            }));
            console.log(acceptedSubmissionCount);
            console.log(rejectedSubmissionCount);
            this.stackedBarChartData[0].data.push(acceptedSubmissionCount);
            this.stackedBarChartData[1].data.push(rejectedSubmissionCount);
          });
          console.log(this.stackedBarChartData);
          console.log(this.AcceptedSubmission);
          console.log(this.RejectedSubmission);
          // console.log(this.overDueSub);
          // console.log(this.notCommentedYet);
        });
      });
    });


  }
}
