import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../services/common.service';
import { facultyInterface, roleInterface, userInterface } from '../interface mock data/interfaces';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  constructor(private commonService: CommonService, private fb: FormBuilder, private toastrService: ToastrService,) { }

  userList: userInterface[];
  facultyList: facultyInterface[] = [];
  roleList: roleInterface[] = []
  ngOnInit(): void {
    //get all users
    this.commonService.getUser({ username: `` }).subscribe(user => {
      if (user?.success) {
        this.userList = user.data;
        // console.log(this.userList);
      }
      else {
        console.log('damn its broken')
      }
    });
    //get all faculties
    this.commonService.getFaculties().subscribe(
      f => {
        if (f?.success) {
          this.facultyList = f.data;
          console.log(f);
        }
      }
    )
    //get all roles
    this.commonService.getAllRoles().subscribe(
      r => {
        if (r?.success) {
          this.roleList = r.data;
          // console.log(this.roleList)
        }
      }
    )
  }
  p: number = 1;
  searchPagination: number = 1;

  // user = this.userList;


  username = new FormControl('');
  firstName = new FormControl('');
  lastName = new FormControl('');
  phoneNumber = new FormControl('');
  email = new FormControl('');
  userRole = new FormControl('');
  userFaculty = new FormControl('');
  password = new FormControl('');


  getFacultyName(facultyId) {
    return this.facultyList.find(faculty => +faculty.facultyId === +facultyId);
  }

  getSelectedUser(username: string) {
    console.log(username);
    let found = this.userList.find(user => user.userName == username);
    console.log(found);
    this.username.setValue(found.userName);
    this.email.setValue(found.email);
    this.firstName.setValue(found.firstName);
    this.lastName.setValue(found.lastName);
    this.phoneNumber.setValue(found.phone);
    (<HTMLOptionElement>document.querySelector('#role-select [id="' + found.role.roleName + '"]')).selected = true;
    if (found.facultyId) {
      (<HTMLOptionElement>document.querySelector(`#faculty-select [value="${found.facultyId}"]`)).selected = true;
    }
    else {
      (<HTMLOptionElement>document.querySelector(`#faculty-select [value="null"]`)).selected = true;
    }

  }

  clearInput() {
    this.username.setValue('');
    this.email.setValue('');
    this.firstName.setValue('');
    this.lastName.setValue('');
    this.phoneNumber.setValue('');
  }

  confirmDeletion() {
    let container = document.querySelector('#confirmDeletionMessage');
    let user = (<HTMLInputElement>document.getElementById("username")).value
    if (user == '') {
      container.innerHTML = `Please make sure that all input fields has data.`
    }
    else {
      container.innerHTML = `Are you sure you want to delete "${user}"?`;
    };
  }

  confirmUpdate() {
    let container = document.querySelector('#confirmUpdateMessage');
    let toBeUpdatedUser = (<HTMLInputElement>document.getElementById("username")).value
    if (toBeUpdatedUser == '') {
      container.innerHTML = `Please make sure that all input fields has data.`
    }
    else {
      let previous = this.userList.find(user => user.userName == toBeUpdatedUser);
      // console.log(previous)
      if (previous) {
        container.innerHTML = `
      Are you sure you want to update "${toBeUpdatedUser}"?<br>
      <div class='row'>
      <div class='col-6'>
      <b>Previous data:</b><br>
        Name: ${previous.firstName} ${previous.lastName}<br> 
        Phone: ${previous.phone},<br> 
        Email: ${previous.email},<br> 
        Role: ${previous.role.roleName},<br> 
        Faculty: ${previous.facultyId} </div>
      <div class='col-6'>
      <b>New data:</b><br>
        Name: ${this.firstName.value} ${this.lastName.value}<br>
        Phone: ${this.phoneNumber.value}<br>
        Email: ${this.email.value}<br>
        Role: ${(<HTMLOptionElement>document.querySelector('#role-select')).value}<br>
        Faculty: ${(<HTMLOptionElement>document.querySelector(`#faculty-select`)).value}
      </div>
      </div>`;
      }
      else {
        container.innerHTML = `${toBeUpdatedUser} cannot found in database.<br> Please make sure that the Username is correct.`
      }

    };
  }

  /**
   * Update the user
   */
  updateUser() {
    this.commonService.updateUser({
      username: this.username.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      phone: this.phoneNumber.value,
      email: this.email.value,
      roleId: parseInt(`${(<HTMLOptionElement>document.querySelector('#role-select')).value}`),
      facultyId: parseInt(`${(<HTMLOptionElement>document.querySelector(`#faculty-select`)).value}`)
    }).subscribe(value => {
      if (value.success) {
        this.toastrService.success(`User "${this.username.value}" updated successfully. Please refresh the page to see changes.`);
        console.log(value);
      }
      else {
        console.log(parseInt(`${(<HTMLOptionElement>document.querySelector('#role-select')).value}`))
        const message = 'User ' + value.responseMessage.message + ' ' + value.responseMessage.errorCode
        this.toastrService.error(message);
        console.log(message)
      }
    })
  }

  searchResult = [];
  searchUser = new FormControl('');
  onSearch() {
    this.searchResult.length = 0;
    let container = document.querySelector(`#searchMessage`);
    container.innerHTML = '';
    let username = this.searchUser.value;
    let found = this.userList.filter(el => el.userName.toLowerCase().indexOf(username.toLowerCase()) !== -1)
    if (username == '') {
      container.innerHTML = `Please enter something in the search bar.`
    }
    else if (found.length > 0) {
      found.forEach(element => {
        this.searchResult.push(element)
      });
      console.log(found)
    }
    else if (this.searchResult.length == 0) {
      container.innerHTML = `"${username}" not found. Please provide another keyword.`
    }
  }

  findUser(username) {
    let found = this.userList.find(user => user.userName == username);
    return found;
  }

  inputCheck() {
    if (this.username.value !== '' &&
      this.email.value !== '' &&
      this.firstName.value !== '' &&
      this.lastName.value !== '' &&
      this.phoneNumber.value !== '') {
      return true;
    }
    else return false;
  }
  addNewUserCheck() {
    let container = document.querySelector('#confirmAddMessage');
    if (this.inputCheck() == true) {
      let input = this.username.value;
      let result = this.findUser(input);
      if (result == undefined) {
        container.innerHTML = `Are you sure you want to create new user "${this.username.value}"?
        <br>
        Name: ${this.firstName.value} ${this.lastName.value}<br>
        Phone: ${this.phoneNumber.value}<br>
        Email: ${this.email.value}<br>
        Role: ${(<HTMLOptionElement>document.querySelector('#role-select')).value}<br>
        Faculty: ${(<HTMLOptionElement>document.querySelector(`#faculty-select`)).value}`
        return true;
      }
      else {
        container.innerHTML = `Username ${result.userName} already exists!`;
        return false;
      }
    }
    else {
      container.innerHTML = `Please make sure that all input fields has data`
      return false;
    }
  }

  randomPassword(length) {
    let result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#$*&';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  addNewUser() {
    if (this.password.value == '') {
      this.password.setValue(this.randomPassword(8));
    }
    this.commonService.addNewUser({
      username: this.username.value,
      password: this.password.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      phone: this.phoneNumber.value,
      email: this.email.value,
      roleId: parseInt(`${(<HTMLOptionElement>document.querySelector('#role-select')).value}`),
      facultyId: parseInt(`${(<HTMLOptionElement>document.querySelector(`#faculty-select`)).value}`)
    }).subscribe(value => {
      if (value.success) {
        this.toastrService.success(`User ${this.username.value} created successfully`);
        console.log(value);
        this.clearInput();
      }
      else {
        console.log(parseInt(`${(<HTMLOptionElement>document.querySelector('#role-select')).value}`))
        const message = 'User ' + value.responseMessage.message + ' ' + value.responseMessage.errorCode
        this.toastrService.error(message);
        console.log(message)
      }
    })
  }
}


