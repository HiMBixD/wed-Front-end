import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  constructor(private commonService: CommonService) { }

  user;
  ngOnInit(): void {
    this.commonService.getMyInfo({}).subscribe(val => {
      if (val) {
        this.user = val;
        // console.log(this.user);
        // console.log(val.data.userName);
      }
    });
  }

  // firstName = new FormControl();
  // lastName = new FormControl();
  // phoneNumber = new FormControl();

  currentPassword = new FormControl('');
  newPassword = new FormControl('');
  confirmPassword = new FormControl('');

  newPasswordValidation: boolean;
  errorMessage: string;

  checkPassword() {
    //check if current password match the one from db

    //check if newPassword and Confirm password is the same
    this.errorMessage = ""
  }

  updateUserInfo() {
    let account = this.user.data.userName; //keep username the same
    // let newFirstName = this.firstName.value; //get from input
    // let newLastName = this.lastName.value; //get from input
    // let phoneNumber = this.phoneNumber.value;
    let newFirstName = (<HTMLInputElement>document.getElementById('firstName')).value;
    let newLastName = (<HTMLInputElement>document.getElementById(`lastName`)).value;
    let phoneNumber = (<HTMLInputElement>document.getElementById(`phoneNumber`)).value;
    let email = this.user.data.email;
    let accountType = this.user.data.role.roleName;
    let facultyId = this.user.data.facultyId;
    console.log(account, newFirstName, newLastName, phoneNumber, email, accountType, facultyId);
  }
}
