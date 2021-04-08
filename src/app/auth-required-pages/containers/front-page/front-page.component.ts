import { Component, OnInit } from '@angular/core';
import { AssignmentDetailsService } from '../../services/assignment-details.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent implements OnInit {

  constructor(private commonService: CommonService,
    private asmDetails: AssignmentDetailsService
  ) { }
  userDetails;
  availableAssignment;
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
                let today = new Date()
                console.log(today);
                // console.log(this.availableAssignment[3].assignment.deadline.endDate)
                this.availableAssignment = this.availableAssignment.filter(
                  element => {
                    let m = new Date(element.assignment.deadline.endDate);
                    // element.assignment.deadline.endDate > today
                    m > today;
                  })
                console.log(this.availableAssignment);
                // console.log(this.availableAssignment[0].assignment.deadline.endDate)
              }
            })
        }
      }
    );
  }
}
