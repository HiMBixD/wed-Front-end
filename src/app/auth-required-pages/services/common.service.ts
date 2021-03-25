import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  getMyInfo(body): Observable<any> {
    const payload: any = {
      body
    };
    return this.http.post(`${environment.apiUrl}/user/get-my-info`, payload);
  }

  uploadFile(body: { file: File, submissionId: any }): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', body.file);
    formData.append('submissionId', body.submissionId);
    return this.http
      .post(`${environment.apiUrl}/file/upload`, formData, {
        reportProgress: true,
        observe: 'events',
      });
  }

  getFilesBySub(body): Observable<any> {
    return this.http.post(`${environment.apiUrl}/file/get-files`, body);
  }
  // ${environment.apiUrl}
}
