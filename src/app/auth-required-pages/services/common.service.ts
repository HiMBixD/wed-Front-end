import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) {
  }

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

  uploadImportRoot(body: { file: File}): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', body.file);
    return this.http
      .post(`${environment.apiUrl}/file/import-root`, formData, {
        reportProgress: true,
        observe: 'events',
      });
  }

  // searchUser(body: {username: string}): Observable<any> {
  // }
  changePassword(data: { username: string, oldPassword: string, newPassword: string }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/user/change-password`, data);
  }

  /**
   * Update user's own account info.
   * @param info
   * @returns
   */
  updateInfo(info: {
    username: string,
    firstName: string,
    lastName: string,
    phone: string
  }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/user/update-my-info`, info);
  }

  // get other user's info
  getUserInfo(userInfo: {
    username: string
  }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/user/get-user-info`, userInfo);
  }

  /**
   * Get user by username.
   * @param userName user's username, string.
   * @returns
   */
  getUser(userName: { username: string }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/admin/search-users`, userName);
  }

  getFaculties(): Observable<any> {
    const temp = {};
    return this.http.post(`${environment.apiUrl}/get-Faculties`, temp);
  }

  /**
   * Get Files by Submission Id
   * @param body
   * @returns
   */
  getFilesBySub(submission: { submissionId: number }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/file/get-files`, submission);
  }

  /**
   * Get all user roles
   * @returns
   */
  getAllRoles(): Observable<any> {
    const temp = {};
    return this.http.post(`${environment.apiUrl}/get-Roles`, temp);
  }

  addNewUser(user: {
    username: string,
    password?: string,
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    roleId: number,
    facultyId?: number
  }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/admin/create-user`, user);
  }

  /**
   * Admin: Update user
   * @param user
   * @returns
   */
  updateUser(user: {
    username: string,
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    roleId: number,
    facultyId: number
  }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/admin/update-user-info`, user);
  }

  // ${environment.apiUrl}

  createAssignment(assignment: {
    assignName: string,
    description: string,
    facultyId: number,
    deadlineId: number,
  }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/create-assignment`, assignment);
  }

  /**
   * Search for submission using username, assignmentId or status
   * @param submission
   * @returns
   */
  searchSubmission(submission: {
    username: string,
    assignmentId: number,
    status: number
  }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/search-submission`, submission);
  }

  selectSubmission(submission: {
    submissionId: number,
    status: number
  }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/select-submission`, submission);
  }

  /**
   * For students: Submit new submission by assignmentId
   * @param submission
   * @returns
   */
  submitSubmission(submission: {
    assignmentId: number
  }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/student/post-submission`, submission);
  }

  getComment(comment: {
    submissionId: number
  }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/get-comment`, comment);
  }

  addComment(comment: {
    content: string,
    submissionId: number
  }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/add-comment`, comment);
  }

  /**
   * Get deadline by Id
   * @param deadline
   * @returns
   */
  getDeadline(deadline: { deadlineId: string }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/user/get-deadline`, deadline);
  }

  /**
   * Get all deadline from a time period
   * @param deadline {date: {from: any, to: any}}
   * @returns
   */
  getDeadlinePeriod(deadline: {
    date: {
      from: any,
      to: any
    }
  }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/user/get-list-deadline`, deadline);
  }

  /**
   * Create a new closure date.
   * @param closure
   * @returns
   */
  setClosureDate(closure: {
    action?: string,
    id?: string,
    startDate: Date,
    endDate: Date,
  }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/admin/set-closure`, closure);
  }

  /**
   * Search for assignment using faculty id and deadlineId
   * @param assignment: { facultyId: number, deadlineId?: number }
   * @returns
   */
  searchAssignment(assignment: {
    facultyId: any,
    deadlineId?: any,
    username: any
  }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/search-assignment`, assignment);
  }

  getAssignmentById(asmId: { assignmentId: number }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/get-assignment-by-id`, asmId);
  }

  getSubmissionCount(facultyId: { facultyId: number }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/count-submission`, facultyId);
  }

  /**
   * Update existing assignment
   * @param assignment
   * @returns
   */
  updateAssignment(assignment: {
    assignmentId: number,
    facultyId: number,
    assignName: string,
    description: string,
    deadlineId: number,
  }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/edit-assignment`, assignment)
  }

  submissionStatus(status: {
    submissionId: number,
    status: number
  }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/select-submission`, status)
  }
}


