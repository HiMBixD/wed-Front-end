import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
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
  // searchUser(body: {username: string}): Observable<any> {
  // }
  changePassword(data: { username: string, oldPassword: string, newPassword: string }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/user/change-password`, data);
  }

  updateInfo(info: { username: string, firstName: string, lastName: string, phone: string }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/user/update-my-info`, info);
  }

  getUser(userName: { username: string }): Observable<any>{
    return this.http.post(`${environment.apiUrl}/admin/search-users`, userName);
  }

  getFaculties(): Observable<any>{
    const temp ={};
    return this.http.post(`${environment.apiUrl}/get-Faculties`,temp)
  }

  getFilesBySub(body): Observable<any> {
    return this.http.post(`${environment.apiUrl}/file/get-files`, body);
  }
  // ${environment.apiUrl}
}
