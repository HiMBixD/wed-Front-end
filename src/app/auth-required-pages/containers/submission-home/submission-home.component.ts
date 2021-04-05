import { Component, OnInit } from '@angular/core';
import { assignmentStatus } from '../../interfaces/assignment';
import { AssignmentDetailsService } from '../../services/assignment-details.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-submission-home',
  templateUrl: './submission-home.component.html',
  styleUrls: ['./submission-home.component.scss']
})
export class SubmissionHomeComponent implements OnInit {

  constructor(private commonService: CommonService,
    private asmDetails: AssignmentDetailsService) { }

  ngOnInit(): void {
    this.commonService.getMyInfo({}).subscribe(
      value => {
        if (value.data) {
          this.userDetails = value.data;
          console.log(this.userDetails);
          //get all available 
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
          )
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


  userDetails;
  availableAssignment;
  mySubmittedAssignment;

  mockASM;

  findAssignment() {
    this.commonService.searchAssignment({
      facultyId: null,
      deadlineId: null, username: this.userDetails.userName
    }).subscribe(value => {
      this.mockASM = value;
      console.log(this.mockASM)
    })
  }
  //handle available assignment: 


}
