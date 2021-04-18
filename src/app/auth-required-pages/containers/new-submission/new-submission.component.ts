import { Location } from '@angular/common';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CommonService } from '../../services/common.service';


@Component({
  selector: 'app-new-submission',
  templateUrl: './new-submission.component.html',
  styleUrls: ['./new-submission.component.scss'],
  preserveWhitespaces: true
})
export class NewSubmissionComponent implements OnInit {

  fileTypes = ['apng', 'avif', 'gif', 'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'svg', 'webp'];

  ///////////////////////////////////////////////////////
  commentPage = 1;
  isSubmitting = false;
  fileInfos: Observable<any>;
  files: File[] = [];
  fileProgress = {};
  filesGot: any[] = [];
  url = `${environment.apiUrl}/file/read/`;
  asm$: Observable<any>;
  fileIdViewed;
  allComments = [];
  submissionId;
  submissionDetails;
  assignment;
  userDetails;
  comment = new FormControl('');
  filesGotLoading: boolean = false;
  commentsLoading: boolean = false;
  postingComment: boolean = false;
  viewedFile;
  agreeTerm = false
  ///////////////////////////////////////////////////////

  constructor(private uploadService: CommonService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private locationService: Location) {
  }

  checkFileTypes(): any {
    const fileExtension = this.viewedFile?.fileName?.split('.').reverse()[0];
    return this.fileTypes.includes(fileExtension?.toLowerCase());
  }


  ngOnInit(): void {

    this.filesGotLoading = true;
    this.commentsLoading = true;

    //get assignment from asmId from route
    this.asm$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.uploadService.getAssignmentById(
          {
            assignmentId: +params.get('asmId')
          }
        )
      })
    );

    this.asm$.subscribe(value => {
      console.log(value.data);
      this.assignment = value.data;
      //get user info
      this.uploadService.getMyInfo({}).subscribe(
        value => {
          if (value.data) {
            this.userDetails = value.data;
            //get submission
            this.uploadService.searchSubmission({
              username: this.userDetails.userName,
              assignmentId: this.assignment.assignmentId,
              status: null,
            }).subscribe(
              value => {
                if (value.success) {
                  this.submissionDetails = value.data;
                  //submission details is an Array
                  // console.log(this.submissionDetails[0].submissionId)
                  if (this.submissionDetails[0].submissionId != undefined) {
                    this.submissionId = this.submissionDetails[0].submissionId
                    this.getFiles();
                    this.uploadService.getComment({ submissionId: this.submissionId }).subscribe(
                      value => {
                        this.allComments = value.data.reverse();
                      }
                    )
                    // console.log(this.submissionId)
                  }
                }
              }
            )
            this.filesGotLoading = false;
            this.commentsLoading = false;
          }
        }
      );
    })
  }

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  getFiles() {
    let submissionId = this.submissionId;
    this.uploadService.getFilesBySub({ submissionId }).subscribe(file => {
      this.filesGot = file;
      console.log(file)
      if (file.data != null && file.data.length > 0 ) {
        console.log('https://docs.google.com/a/WedPj/viewer?url=' + this.url + file.data[0].fileId);
      }
      else {
        console.log('no files found');
      }
    });
  }

  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  upload(file: File, submissionId: number): void {
    //First time submitting, then submission ID would be null.
    //if submission Id null
    //submit => get new id
    this.fileProgress[file.name] = 0;
    this.uploadService.uploadFile({file, submissionId})
      .subscribe(
        event => {
          this.isSubmitting = true;
          if (event.type === HttpEventType.UploadProgress) {
            this.fileProgress[file.name] = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            if (!event?.body?.success) {
              this.fileProgress[file.name] = -1;
              this.isSubmitting = false;
            }
            this.isSubmitting = false;
          }
        },
        err => {
          this.fileProgress[file.name] = -1;
        }
      );
  }

  submit() {
    //no submission details found => create new & upload file, else if found, upload files.
    // console.log(this.submissionId)
    if (!this.submissionId) {
      this.uploadService.submitSubmission({
        assignmentId: this.assignment.assignmentId
      }).subscribe(value => {
        console.log('submit submission')
        console.log(value);
        this.submissionId = value.data.submissionId;
        this.files.forEach(file => {
          this.upload(file, this.submissionId);
        });
        // this.isSubmitting = false;
      });
      this.getFiles();
    }
    else {
      this.files.forEach(file => {
        this.upload(file, this.submissionId);
      });
      this.getFiles();
    }
  }

  getProgress(progress): any {
    return progress > 0 ? progress + '%' : null;
  }

  goBack() {
    this.locationService.back();
  }

  submitComment() {
    this.postingComment = true;
    console.log(this.submissionId);
    this.uploadService.addComment({ content: this.comment.value, submissionId: this.submissionId }).subscribe(
      value =>
      {
        if (value.success) {
          console.log('success');
          this.getComment();
          this.comment.setValue('');
          this.postingComment = false;
          this.toastr.success('Comment posted successfully!');
        }
        else {
          const message = `Failed to create comment. Error code:` + value.responseMessage.message + ' ' + value.responseMessage.errorCode
          this.toastr.error('Failed to create comment. Please try again')
          console.log(message)
        }
      }
    )
  }

  getComment() {
    this.uploadService.getComment({ submissionId: this.submissionId }).subscribe(
      value => {
        this.allComments = value.data.reverse();
        console.log(value.data)
      });
  }
}
