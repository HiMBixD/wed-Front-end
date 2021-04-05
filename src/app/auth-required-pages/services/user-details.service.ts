import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  constructor() { }
  userDetails = [];
  facultyName: string;
  
  setUserDetails(details : any){
    this.userDetails = details;
  }

  getUserDetails(){
    return this.userDetails
  }

  clearUserDetails(){
    this.userDetails.length = 0
  }
  setFacultyName(fName: string) {
    this.facultyName = fName;
    console.log('current user faculty ' + fName);
  }
  getFacultyName() {
    console.log(this.facultyName)
    return this.facultyName;
  }
}
