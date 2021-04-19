import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommonService } from '../../../services/common.service';
import { ToastrService } from 'ngx-toastr';
import { assignmentDetails } from 'src/app/auth-required-pages/interfaces/assignment';
import { environment } from 'src/environments/environment';
import { facultyInterface } from 'src/app/auth-required-pages/interfaces/interfaces';
import { AssignmentDetailsService } from 'src/app/auth-required-pages/services/assignment-details.service';

@Component({
  selector: 'app-new-assignment',
  templateUrl: './new-assignment.component.html',
  styleUrls: ['./new-assignment.component.scss'],
  preserveWhitespaces: true
})
export class NewAssignmentComponent implements OnInit {
  constructor(private commonService: CommonService,
    private toastrService: ToastrService,
  private asmDetails: AssignmentDetailsService) { }

  facultyList: facultyInterface[] = [];
  ngOnInit(): void {
    //get user faculty id
    this.commonService.getMyInfo({}).subscribe(val => {
      if (val) {
        this.userInfo = val.data;
        //get assignment by this user.
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
      }
    });

    this.commonService.getFaculties().subscribe(
      f => {
        if (f?.success) {
          this.facultyList = f.data;
          console.log(f);
        }
      }
    )
    //get assignment list by id

    //populate assignmentList
  }

  //////////////////////////////////////////////////////
  assignmentList;
  userInfo;
  deadlineList = [];
  p = 1;
  deadlineSelected;

  // deadlineSelect = new FormControl('')
  filterStart = new FormControl('');
  filterEnd = new FormControl('');
  assignmentName = new FormControl('');
  description = new FormControl('');
  faculty = new FormControl('');

  toBeUpdated;

  urlDownloadSelected = `${environment.apiUrl}/file/download-selected/`;

  ////////////////////////////////////////////////////////


  getFacultyName(facultyId) {
    let name = this.facultyList.find(faculty => +faculty.facultyId === +facultyId);
    return name.facultyName;
  }

  getAssignmentDetails(asm: assignmentDetails) {
    this.toBeUpdated = asm;
    this.assignmentName.setValue(asm.assignment.assignmentName);
    this.description.setValue(asm.assignment.description);
    this.deadlineList.push(asm.assignment.deadline);
    this.deadlineSelected = asm.assignment.deadline.deadlineId;
    this.faculty.setValue(asm.assignment.facultyId)
  }

  onSearch() {
    console.log(this.filterEnd.value)
    this.commonService.getDeadlinePeriod({
      date: {
        from: this.filterStart.value,
        to: this.filterEnd.value
      }
    }).subscribe(value => {
      if (value.success && value.data.length > 0) {
        this.deadlineList = value.data;
        console.log(value)
        let message = document.querySelector('#deadlineAlertContainer');
        message.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Success!</strong> Found deadlines between ${this.filterStart.value} and ${this.filterEnd.value}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`
      }
      else {
        let message = document.querySelector('#deadlineAlertContainer');
        message.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Failed!</strong> No deadline found. Please try again.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`
      }

    })
  }

  newAssignment() {
    // console.log(
    //   this.assignmentName.value,
    //   this.description.value,
    //   this.userInfo.facultyId,
    //   this.deadlineSelected
    // )
    this.commonService.createAssignment({
      assignName: String(this.assignmentName.value),
      description: String(this.description.value),
      facultyId: this.faculty.value,
      deadlineId: parseInt(this.deadlineSelected),
      //TODO: this currently doesn't return a value.
    }).subscribe(value => {
      if (value.success) {
        this.toastrService.success(`Created Event "${this.assignmentName.value}"`);
        this.syncAssignments()
      }
      else {
        const message = `Failed to create "${this.assignmentName.value}". Error code :` + value.responseMessage.message + ' ' + value.responseMessage.errorCode
        this.toastrService.error(message)
        console.log(message)
      }
    })
  }

  logDescription() {
    console.log(this.description.value)
  }

  clearValues() {
    this.assignmentName.setValue('');
    this.description.setValue('');
    this.deadlineSelected.setValue('');
    this.description.setValue('')
  }

  updateAssignment() {
    console.log(this.toBeUpdated.assignment.assignmentId, this.assignmentName.value, this.description.value, this.deadlineSelected)
    this.commonService.updateAssignment({
      assignmentId: parseInt(this.toBeUpdated.assignment.assignmentId),
      facultyId: parseInt(this.faculty.value),
      assignName: String(this.assignmentName.value),
      description: String(this.description.value),
      deadlineId: parseInt(this.deadlineSelected),
    }).subscribe(value => {
      if (value.success) {
        this.toastrService.success(`Event "${this.assignmentName.value}" updated successfully!`);
        this.syncAssignments()
      }
      else {
        const message = `Failed to update "${this.assignmentName.value}". Error code: ` + value.responseMessage.message + ' ' + value.responseMessage.errorCode
        this.toastrService.error(message)
        console.log(message)
      }
    })
  }

  syncAssignments() {
    this.commonService.searchAssignment({
      facultyId: '',
      username: '',
      deadlineId: ''
    }).subscribe(
      list => {
        if (list) {
          this.assignmentList = list.data;
        }
      }
    )
  }
}
