import {Location} from '@angular/common';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {CommonService} from '../../services/common.service';

@Component({
  selector: 'app-new-submission',
  templateUrl: './new-submission.component.html',
  styleUrls: ['./new-submission.component.scss']
})
export class NewSubmissionComponent implements OnInit {


  fileTypes = ['.apng', '.avif', '.gif', '.jpg', '.jpeg', '.jfif', '.pjpeg', '.pjp', '.png', '.svg', '.webp'];

  fileInfos: Observable<any>;
  files: File[] = [];
  fileProgress = {};
  filesGot;
  url = `${environment.apiUrl}/file/read/`;
  fileIdViewed;

  asm$: Observable<any>;

  constructor(
    private uploadService: CommonService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private locationService: Location) {
  }

  checkFileTypes(): any {
    const n = element.fileName;
    console.log(n);
    console.log(n.lastIndexOf('.'));
    const fileExtension = n.slice(n.lastIndexOf('.'));
    console.log(fileExtension);
    if (this.fileTypes.includes(fileExtension)) {
      this.fileIdViewed = false;
    }
  }


  ngOnInit(): void {


    this.uploadService.getComment({submissionId: 2}).subscribe(
      value => {
        console.log(value);
      }
    );
    this.asm$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
          return this.uploadService.getAssignmentById(
            {
              assignmentId: +params.get('asmId')
            }
          );
        }
      )
    );
    this.asm$.subscribe(value => {
      console.log(value.data);
      this.assignment = value.data;
    });
    this.getFiles(2);
    // if (this.assignment.length == 0) {
    //   this.toastr.error("You aren't supposed to be here!");
    //   // this.router.navigate(['/submissionPortal'])
    // }
    // else {
    //   console.log(this.assignment)
    // };
  }

  assignment: any;

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  getFiles(submissionId: number) {
    this.uploadService.getFilesBySub({submissionId}).subscribe(file => {
      this.filesGot = file.data;

      this.checkFileTypes()

      console.log('https://docs.google.com/a/WedPj/viewer?url=' + this.url + file.data[0].fileId);
      file.data.forEach(element => {

      });
    });
  }

  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  upload(file: File, submissionId: number): void {
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

  submit() {
    this.files.forEach(file => {
      this.upload(file, 2);
    });
  }

  getProgress(progress): any {
    return progress > 0 ? progress + '%' : null;
  }

  goBack() {
    this.locationService.back();
  }
}
