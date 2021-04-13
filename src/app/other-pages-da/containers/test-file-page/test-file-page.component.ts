import {Component, OnInit} from '@angular/core';
import {OtherPageService} from '../../services/other-page.service';
import {Observable} from 'rxjs';
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {DomSanitizer} from "@angular/platform-browser";
import * as moment from 'moment';
@Component({
  selector: 'app-test-file-page',
  templateUrl: './test-file-page.component.html',
  styleUrls: ['./test-file-page.component.scss']
})
export class TestFilePageComponent implements OnInit {

  fileInfos: Observable<any>;
  files: File[] = [];
  fileProgress = {};
  filesGot;
  url = `${environment.apiUrl}/file/read/`;
  fileIdViewed;
  ngOnInit(): void {
    this.getFiles(2);
    this.test();
  }

  test() {
    console.log(moment(new Date()).add(14 * 24 * 60 * 60 * 1000).format());
    console.log(moment(new Date()).unix());
  }
  constructor(private uploadService: OtherPageService, private sanitizer: DomSanitizer) {
  }

  getFiles(submissionId) {
    this.uploadService.getFilesBySub({submissionId}).subscribe(file => {
      this.filesGot = file;
      console.log('https://docs.google.com/a/WedPj/viewer?url='+this.url+file.data[0].fileId);
    });
  }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  upload(file: File, submissionId): void {
    this.fileProgress[file.name] = 0;
    this.uploadService.uploadFile({file, submissionId})
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

  onSelect(event) {
    this.fileProgress = {};
    this.files.push(...event.addedFiles);
    this.files.forEach(file => {
      this.fileProgress[file.name] = 0;
    });
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
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
