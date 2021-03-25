import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OtherPageService {

  constructor(private http: HttpClient) { }

  uploadFile(body: { file: File, submissionId: any}): Observable<HttpEvent<any>> {
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

}
