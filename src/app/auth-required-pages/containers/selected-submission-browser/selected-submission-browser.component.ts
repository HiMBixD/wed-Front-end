import {Component, OnInit} from '@angular/core';
import {assignmentStatus} from '../../interfaces/assignment';
import {CommonService} from '../../services/common.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Location} from '@angular/common';
import {environment} from '../../../../environments/environment';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-selected-submission-browser',
  templateUrl: './selected-submission-browser.component.html',
  styleUrls: ['./selected-submission-browser.component.scss']
})
export class SelectedSubmissionBrowserComponent implements OnInit {
  userDetails: any;
  facultyList: any;
  viewedFile: any;
  fileTypes = ['apng', 'avif', 'gif', 'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'svg', 'webp'];
  url = `${environment.apiUrl}/file/read/`;


  constructor(private commonService: CommonService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    // this.commonService.getMyInfo({}).subscribe(val => {
    //   if (val) {
    //     this.userDetails = val.data;
    //     console.log(this.userDetails)
    //   }
    // });

    this.commonService.getFaculties().subscribe(
      f => {
        if (f.success) {
          this.facultyList = f.data;
          // console.log(f);
        }
      }
    );

    this.commonService.searchSubmission({
      username: '',
      assignmentId: null,
      status: 1
    }).subscribe(value => {
      if (value) {
        this.selectedSubmissions = value.data;
        console.log(this.selectedSubmissions);
      }
    });
  }

  //////////////////////////////////////////////////
  p: number = 1;
  assignmentPage: number = 1;
  submissionPage: number = 1;
  currentUser: string;

  selectedSubmissions = [];
  assignmentList = [];
  submissionList = [];
  filesList = [];
  deadlineSearch = new FormControl('')
  ////////////////////////////////////////////////

  checkFileTypes(): any {
    const fileExtension = this.viewedFile?.fileName?.split('.').reverse()[0];
    return this.fileTypes.includes(fileExtension?.toLowerCase());
  }

  transform(url): any {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getFacultyName(facultyId) {
    let found = this.facultyList.find(faculty => +faculty.facultyId === +facultyId);
    return found.facultyName;
  }

  //this.userDetails.facultyId
  fileIdViewed: any;

  /**
   * Show all assignments
   */

  showAllAssignments() {
    this.commonService.searchAssignment({
      facultyId: '',
      username: '',
      deadlineId: ''
    }).subscribe(
      list => {
        if (list) {
          this.assignmentList = list.data;
          console.log(list);
        }
      }
    );
  }

  /**
   * Show submissions by AssignmentId
   * @param assId Assignment's Id
   */
  showAllSubmissions(assId: any): any {
    this.commonService.searchSubmission({
      username: '',
      assignmentId: assId,
      status: assignmentStatus.selected
    }).subscribe(value => {
      if (value) {
        this.submissionList = value.data;
        console.log(value);
      }
    });
  }

  getFiles(submissionId, username): any {
    this.commonService.getFilesBySub({submissionId}).subscribe(
      value => {
        if (value.success) {
          this.filesList = value.data;
          console.log(this.filesList);
        }
      }
    );
    this.currentUser = username;
  }
  searchSubmissionByDeadline() {
    this.commonService.searchAssignment(
      {
        facultyId: null,
        deadlineId: parseInt(this.deadlineSearch.value),
        username: '',
      }
    ).subscribe(
      value => {
        this.assignmentList = value.data;
      }
    )
  }
}

interface selectedSubmission {
  topic: string,
  username: string,
  date: string,
}


