import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
