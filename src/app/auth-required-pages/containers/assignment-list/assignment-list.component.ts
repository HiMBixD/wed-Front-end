import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { UserDetailsService } from '../../services/user-details.service';

@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.scss']
})
export class AssignmentListComponent implements OnInit {

  constructor(private commonService: CommonService, private userDetails : UserDetailsService) { }

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
}
