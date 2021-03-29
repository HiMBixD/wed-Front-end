import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  constructor(private commonService: CommonService,
    private toastrService: ToastrService,) { }

  user;
  isLoading = false;
  ngOnInit(): void {
    this.commonService.getMyInfo({}).subscribe(val => {
      if (val) {
        this.user = val;
        // console.log(this.user);
        // console.log(val.data.userName);
      }
    });
  }


  currentPassword = new FormControl('');
  newPassword = new FormControl('');
  confirmPassword = new FormControl('');

  newPasswordValidation: boolean;
  errorMessage: string;

  checkPassword() {
    //check if current password match the one from db
    // this.currentPassword.value
    this.commonService.changePassword({
      username: this.user.data.userName,
      oldPassword: this.currentPassword.value,
      newPassword: this.newPassword.value,
    }).subscribe(value => {
      if (value) {
        if (value.success) {
          this.isLoading = false;
          this.toastrService.success('Password Changed Successfully');

        } else {
          this.isLoading = false;
          const message = 'User ' + value.responseMessage.message + ' ' + value.responseMessage.errorCode
          this.toastrService.error(message);
        }
      }
    });
    //check if newPassword and Confirm password is the same
    this.errorMessage = ""
  }

  updateUserInfo() {
    let account = this.user.data.userName;
    let newFirstName = (<HTMLInputElement>document.getElementById('firstName')).value;
    let newLastName = (<HTMLInputElement>document.getElementById(`lastName`)).value;
    let phoneNumber = (<HTMLInputElement>document.getElementById(`phoneNumber`)).value;
    let data = {
      username: account,
      firstName: newFirstName,
      lastName: newLastName,
      phone: phoneNumber
    }
    console.log(account, newFirstName, newLastName, phoneNumber);
    this.commonService.updateInfo(data).subscribe(value => {
      if (value) {
        if (value.success) {
          this.isLoading = false;
          this.toastrService.success('Changes saved successfully');

        } else {
          this.isLoading = false;
          const message = 'User ' + value.responseMessage.message + ' ' + value.responseMessage.errorCode
          this.toastrService.error(message);
        }
      }
    });
  }
}
