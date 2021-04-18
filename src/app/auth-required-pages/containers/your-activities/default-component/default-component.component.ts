import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {CommonService} from '../../../services/common.service';

@Component({
  selector: 'app-default-component',
  templateUrl: './default-component.component.html',
  styleUrls: ['./default-component.component.scss']
})
export class DefaultComponentComponent implements OnInit {
  url = `${environment.apiUrl}/file/unsecure/download-root`;
  fileProgress: number;
  constructor(private uploadService: CommonService,) { }

  ngOnInit(): void {
    this.uploadService.getMyInfo({}).subscribe(
      value => {
        this.userDetails = value.data;
        this.roleName = value.data.role.roleName;
        console.log(this.roleName)
      }
    )
  }

  upload(file: File): void {
    this.fileProgress = 0;
    this.uploadService.uploadImportRoot({file})
      .subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.fileProgress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            if (!event?.body?.success) {
              this.fileProgress = -1;
            }
          }
        },
        err => {
          this.fileProgress = -1;
        });
  }
  userDetails;
  roleName;
  onSelect($event) {
    this.upload($event.target.files[0]);
  }
}
