import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { assignmentStatus } from '../../../interfaces/assignment';
import { AssignmentDetailsService } from '../../../services/assignment-details.service';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-submission-home',
  templateUrl: './submission-home.component.html',
  styleUrls: ['./submission-home.component.scss']
})
export class SubmissionHomeComponent implements OnInit {

  constructor(private commonService: CommonService,
    private asmDetails: AssignmentDetailsService,
    private router: Router) { }

  ngOnInit(): void {
    this.commonService.getMyInfo({}).subscribe(
      value => {
        if (value.data) {
          this.userDetails = value.data;
          console.log(this.userDetails);
          //get all available assignments
          this.commonService.searchAssignment({
            facultyId: this.userDetails.facultyId,
            deadlineId: '',
            username: '',
          }).subscribe(
            subs => {
              if (subs.data) {
                this.availableAssignment = subs.data;
                console.log(this.availableAssignment);
              }
            }
          );

          this.commonService.searchSubmission({
            username: this.userDetails.userName,
            assignmentId: null,
            status: null
          }).subscribe(value => {
            if (value.success) {
              console.log('submitted assignments: ')
              console.log(value.data);
              this.mySubmittedAssignment = value.data;
            }
            else {
              console.log('well something went wrong')
            }
          });
        }
      }
    )
  }

  /////////////////////////////////////////////////////////////
  subHomePage = 1;
  userDetails;
  availableAssignment;
  mySubmittedAssignment;
  /////////////////////////////////////////////////////////////

  findAssignment(asmId: number) {
    let foundAssignment
    this.commonService.getAssignmentById({ assignmentId: asmId }).subscribe(
      value => {
        if (value.success) {
          foundAssignment = value.data;
          this.asmDetails.setAssignment(foundAssignment);
          this.router.navigate([`/yourActivities/submissionPortal/mySubmission/${asmId}`]);
          return foundAssignment;
        }
      }
    )
  }
  findAsmDetails(asmId: number) {
    let foundAssignment = this.availableAssignment.find(element => element.assignmentId = asmId);
    console.log(foundAssignment)
    if (foundAssignment) {
      return foundAssignment
    }
    else {
      return undefined;
    }
  }
}
