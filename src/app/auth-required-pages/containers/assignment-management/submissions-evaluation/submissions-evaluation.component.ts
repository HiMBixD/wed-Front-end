import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';
import { AssignmentDetailsService } from 'src/app/auth-required-pages/services/assignment-details.service';
import { CommonService } from 'src/app/auth-required-pages/services/common.service';
import {DomSanitizer} from "@angular/platform-browser";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-submissions-evaluation',
  templateUrl: './submissions-evaluation.component.html',
  styleUrls: ['./submissions-evaluation.component.scss']
})
export class SubmissionsEvaluationComponent implements OnInit {
  fileTypes = ['apng', 'avif', 'gif', 'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'svg', 'webp'];
  url = `${environment.apiUrl}/file/read/`;
  urlDownloadSubmission = `${environment.apiUrl}/file/download-submission/`;

  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService,
    private asmService: AssignmentDetailsService,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.asm$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.commonService.getAssignmentById(
          {
            assignmentId: +params.get('asmId')
          }
        )
      })
    );

    this.initialLoading = true;

    this.asm$.subscribe(value => {
      this.assignmentDetails = value.data;
      // console.log(this.assignmentDetails);
      //get all submissions from this ID
      this.commonService.searchSubmission({
        username: '',
        assignmentId: this.assignmentDetails.assignmentId,
        status: null,
      }).subscribe(
        value => {
          // console.log('search submission result')
          // console.log(value.data)
          this.submissionList = value.data;
        }
      )
      this.initialLoading = false;
    })

  }
  ////////////////////////////////////////////////
  filesGotLoading: boolean = false;
  initialLoading: boolean = false;
  p = 1;
  cmtPage: number = 1;
  asm$;
  assignmentDetails;
  submissionList = [];
  filesList = [];
  currentUser;
  allComments = [];
  postingComment: boolean = false;
  comment = new FormControl('');
  currentSubmissionId: number;
  commentLoading: boolean = false;
  statusSelected;

  fileIdViewed: any;
  viewedFile: any;

  ///////////////////////////////////////////////
  checkFileTypes(): any {
    const fileExtension = this.viewedFile?.fileName?.split('.').reverse()[0];
    return this.fileTypes.includes(fileExtension?.toLowerCase());
  }

  transform(url): any {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getFiles(submissionId, username, status) {
    this.filesGotLoading = true;
    this.commentLoading = true;
    this.currentSubmissionId = submissionId
    this.commonService.getFilesBySub({ submissionId }).subscribe(
      value => {
        if (value.success) {
          this.filesList = value.data;
          // console.log(this.filesList);
        }
      }
    );
    this.statusSelected = status;
    this.filesGotLoading = false;
    this.getComment(submissionId);
    this.currentUser = username;
    this.commentLoading = false;
  }

  getComment(submissionId: number) {
    this.commentLoading = true;
    this.commonService.getComment({ submissionId: submissionId }).subscribe(
      value => {
        this.allComments = value.data.reverse();
        // console.log(value.data)
      });
    this.commentLoading = false;
  }

  submitComment() {
    this.postingComment = true;
    // console.log(this.currentSubmissionId);
    this.commonService.addComment({ content: this.comment.value, submissionId: this.currentSubmissionId }).subscribe(
      value => {
        if (value.success) {
          // console.log('success');
          this.getComment(this.currentSubmissionId);
          this.comment.setValue('');
          this.postingComment = false;
          this.toastr.success('Comment posted successfully!');
        }
        else {
          const message = `Failed to create comment. Error code: ` + value.responseMessage.message + ' ' + value.responseMessage.errorCode
          this.toastr.error('Failed to create comment. Please try again')
          // console.log(message)
        }
      }
    )
  }
  syncSubmissions() {
    this.asm$.subscribe(value => {
      this.assignmentDetails = value.data;
      this.statusSelected = value.data.status;
      //get all submissions from this ID
      this.commonService.searchSubmission({
        username: '',
        assignmentId: this.assignmentDetails.assignmentId,
        status: null,
      }).subscribe(
        value => {
          this.submissionList = value.data;
        }
      )
      this.initialLoading = false;
    })
  }
  setSubmissionStatus() {
    // console.log(this.statusSelected)
    this.commonService.submissionStatus({
      submissionId: this.currentSubmissionId,
      status: this.statusSelected
    }).subscribe(
      value => {
        if (value.success) {
          this.toastr.success("Update submission status successfully!");
        }
        else {
          this.toastr.error("Status update failed. Please try again.")
        }
      }
    )
  }

}
