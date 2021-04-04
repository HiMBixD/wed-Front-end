import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  constructor() { }
  userDetails = [];
  
  setUserDetails(details : any){
    this.userDetails = details;
  }

  getUserDetails(){
    return this.userDetails
  }

  clearUserDetails(){
    this.userDetails.length = 0
  }
}
