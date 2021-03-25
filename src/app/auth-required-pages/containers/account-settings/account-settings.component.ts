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
  
  firstName = new FormControl('');
  lastName = new FormControl('');


  currentPassword = new FormControl('');
  newPassword = new FormControl('');
  confirmPassword = new FormControl('');

  checkPassword() {
    //check if current password match

    //check if newPassword match RegEx

    //check if newPassword and Confirm password is the same

  }

}
