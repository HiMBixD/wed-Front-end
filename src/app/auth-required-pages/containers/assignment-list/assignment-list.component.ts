import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AssignmentDetailsService } from '../../services/assignment-details.service';
import { CommonService } from '../../services/common.service';
import { UserDetailsService } from '../../services/user-details.service';

@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.scss']
})
export class AssignmentListComponent implements OnInit {

  constructor(private commonService: CommonService,
    private userDetails: UserDetailsService,
    private assignmentDetails: AssignmentDetailsService) { }

  ngOnInit(): void {
    //get user faculty id
    this.userInfo = this.userDetails.getUserDetails();
    //get assignment list by id
    this.commonService.searchAssignment({
      facultyId: '',
      username: '',
      deadlineId: ''
    }).subscribe(
      list => {
        if (list) {
          this.assignmentList = list.data;
          console.log(list)
        }
      }
    )
    //populate assignmentList
  }
  assignmentList = [];
  userInfo = []
  @Output() asmDetails = new EventEmitter<assignmentDetails>();

  getAssignmentDetails(asm: assignmentDetails) {
    this.assignmentDetails.setAssignment(asm);
    this.asmDetails.emit(asm)
    // console.log(this.assignmentDetails.getAssignment())
  }

}

interface assignmentDetails {
  assignment: assignment
  selectedSub: number
  totalSub: number
}

interface assignment {
  assignmentId: number,
  assignmentName: string,
  create_by: string,
  deadline: deadline,
  deadlineId: number,
  description: string,
  facultyId: number,
}

interface deadline {
  deadlineId: number,
  endDate: string,
  startDate: string,
}