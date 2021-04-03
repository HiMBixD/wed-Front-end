import { Component, OnInit } from '@angular/core';
import { AssignmentDetailsService } from '../../services/assignment-details.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-submission-home',
  templateUrl: './submission-home.component.html',
  styleUrls: ['./submission-home.component.scss']
})
export class SubmissionHomeComponent implements OnInit {

  constructor(private commonService: CommonService, private asmDetails: AssignmentDetailsService) { }

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
        }
      }
    )
  }


  userDetails;
  availableAssignment;

  //handle available assignment: 


}
