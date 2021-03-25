import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-new-submission',
  templateUrl: './new-submission.component.html',
  styleUrls: ['./new-submission.component.scss']
})
export class NewSubmissionComponent implements OnInit {

  fileInfos: Observable<any>;
  files: File[] = [];
  fileProgress = {};
  filesGot;
  url = `${environment.apiUrl}/file/read/`;
  fileIdViewed;

  constructor(private uploadService: CommonService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getFiles(2);
  }

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  getFiles(submissionId) {
    this.uploadService.getFilesBySub({ submissionId }).subscribe(file => {
      this.filesGot = file;
      console.log('https://docs.google.com/a/WedPj/viewer?url=' + this.url + file.data[0].fileId);
    });
  }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  upload(file: File, submissionId): void {
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
    this.files.forEach(file => {
      this.upload(file, 2);
    });
  }

  getProgress(progress): any {
    return progress > 0 ? progress + '%' : null;
  }
}
