import {Component, OnInit} from '@angular/core';
import {assignmentStatus} from '../../interfaces/assignment';
import {CommonService} from '../../services/common.service';
import {environment} from '../../../../environments/environment';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-guest-portal',
  templateUrl: './guest-portal.component.html',
  styleUrls: ['./guest-portal.component.scss'],
  preserveWhitespaces: true
})
export class GuestPortalComponent implements OnInit {

  url = `${environment.apiUrl}/file/read/`;
  viewedFile: any;
  fileTypes = ['apng', 'avif', 'gif', 'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'svg', 'webp'];
  fileIdViewed: any;


  constructor(private commonService: CommonService,
              private sanitizer: DomSanitizer) {

  }

  ngOnInit(): void {
    this.commonService.getFaculties().subscribe(
      f => {
        if (f?.success) {
          this.facultyList = f.data;
        }
      }
    );
    this.commonService.getMyInfo({}).subscribe(val => {
      if (val) {
        this.userDetails = val.data;
        console.log(this.userDetails.userName);
      }
    });
  }

  ///////////////////////////////////////////////////////////////////////////////////
  userDetails;
  facultyList;
  p: number = 1;
  assignmentPage: number = 1;
  submissionPage: number = 1;
  currentUser: string;

  selectedSubmissions = [];
  assignmentList = [];
  submissionList = [];
  filesList = [];

  //////////////////////////////////////////////////////////////////////////////////

  getFacultyName(facultyId) {
    if (facultyId == null) {
      return null;
    } else {
      return this.facultyList.find(faculty => +faculty.facultyId === +facultyId);
    }
  }

  transform(url): any {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  checkFileTypes(): any {
    const fileExtension = this.viewedFile?.fileName?.split('.').reverse()[0];
    return this.fileTypes.includes(fileExtension?.toLowerCase());
  }

  showAllAssignments() {
    this.commonService.searchAssignment({
      facultyId: this.userDetails.facultyId,
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

  showAllSubmissions(assId: any) {
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

  getFiles(submissionId, username) {
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
}


interface selectedSubmission {
  topic: string,
  username: string,
  date: string,
}
