import { Location } from '@angular/common';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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

  fileInfos: Observable<any>;
  files: File[] = [];
  fileProgress = {};
  filesGot;
  url = `${environment.apiUrl}/file/read/`;
  fileIdViewed;

  asm$: Observable<any>
  constructor(private uploadService: CommonService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private locationService: Location) { }

  ngOnInit(): void {

    this.uploadService.getComment({ submissionId: 2 }).subscribe(
      value => {
        console.log(value)
      }
    )
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
                    // console.log(this.submissionId)
                  }
                }
              }
            )
          }
        }
      );
    })
  }
  submissionId;
  submissionDetails;
  assignment;
  userDetails;

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
    this.uploadService.uploadFile({ file, submissionId })
      .subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.fileProgress[file.name] = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            if (!event?.body?.success) {
              this.fileProgress[file.name] = -1;
            }
          }
        },
        err => {
          this.fileProgress[file.name] = -1;
        });
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
      });
    }
    else {
      this.files.forEach(file => {
        this.upload(file, this.submissionId);
      });
    }
  }

  getProgress(progress): any {
    return progress > 0 ? progress + '%' : null;
  }
  goBack() {
    this.locationService.back();
  }
}
