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
                console.log(this.availableAssignment);
              }
            })
        }
      }
    );
  }
}
