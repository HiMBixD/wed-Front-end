import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { mockFaculty } from '../interface mock data/faculty';
import { mockRoles } from '../interface mock data/roles';
import { mockUser } from '../interface mock data/user';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  constructor(private commonService: CommonService) {  }

  userList;
  facultyList = [];
  ngOnInit(): void {
    this.commonService.getUser({ username: `` }).subscribe(user => {
      if (user?.success)
      {
        this.userList = user.data;
        // console.log(user);
      }
      else {
        console.log('damn its broken')
      }
    });
    this.commonService.getFaculties().subscribe(
      f => {
        if (f?.success) {
          this.facultyList = f.data;
          // console.log(f);
        }
      }
    )
  }
  p: number = 1;
  searchPagination: number = 1;
  user = mockUser;
  // user = this.userList;
  role = mockRoles;
  faculty = mockFaculty;

  username = new FormControl('');
  firstName = new FormControl('');
  lastName = new FormControl('');
  phoneNumber = new FormControl('');
  email = new FormControl('');
  userRole = new FormControl('');
  userFaculty = new FormControl('');


  getFacultyName(facultyId) {
    return this.facultyList.find(faculty => +faculty.facultyId === +facultyId);
  }

  getSelectedUser(username: string) {
    console.log(username);
    let found = this.user.find(user => user.username == username);
    console.log(found);
    this.username.setValue(found.username);
    this.email.setValue(found.email);
    this.firstName.setValue(found.firstName);
    this.lastName.setValue(found.lastName);
    this.phoneNumber.setValue(found.phone);
    (<HTMLOptionElement>document.querySelector('#role-select [value="' + found.role_id + '"]')).selected = true;
    (<HTMLOptionElement>document.querySelector(`#faculty-select [value="${found.faculty_id}"]`)).selected = true;
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
      container.innerHTML = `Are you sure you want to delete ${user}?`;
    };
  }

  confirmUpdate() {
    let container = document.querySelector('#confirmUpdateMessage');
    let toBeUpdatedUser = (<HTMLInputElement>document.getElementById("username")).value
    if (toBeUpdatedUser == '') {
      container.innerHTML = `Please make sure that all input fields has data.`
    }
    else {
      let previous = this.user.find(user => user.username == toBeUpdatedUser);
      container.innerHTML = `
      Are you sure you want to update ${toBeUpdatedUser}?<br>
      <div class='row'>
      <div class='col-6'>
      <b>Previous data:</b><br>
        Name: ${previous.firstName} ${previous.lastName}<br> 
        Phone: ${previous.phone},<br> 
        Email: ${previous.email},<br> 
        Role: ${previous.role_id},<br> 
        Faculty: ${previous.faculty_id} </div>
      <div class='col-6'>
      <b>New data:</b><br>
        Name: ${this.firstName.value} ${this.lastName.value}<br>
        Phone: ${this.phoneNumber.value}<br>
        Email: ${this.email.value}<br>
        Role: ${(<HTMLOptionElement>document.querySelector('#role-select')).value}<br>
        Faculty: ${(<HTMLOptionElement>document.querySelector(`#faculty-select`)).value}
      </div>
      </div>`;
    };
  }

  /**
   * Update the user
   */
  updateUser() {

  }

  searchResult = [];
  onSearch() {
    this.searchResult.length = 0;
    let container = document.querySelector(`#searchMessage`);
    container.innerHTML = '';
    let username = (<HTMLInputElement>document.getElementById("searchUser")).value;
    let found = this.user.find(user => user.username == username);
    if (found) {
      this.searchResult.push(found);
    }
    else if (username == '') {
      container.innerHTML = `Please enter something in the search bar.`
    }
    else {
      container.innerHTML = `'${username}' not found. Please provide the exact username.`
    }
  }

  addNewUser() {
    let container = document.querySelector('#confirmAddMessage');
    container.innerHTML = `TODO: Check:
    if user exists in db => cant add user with same db
    <br> Else if user does not exists => then confirm that admin wants to add the user.`
    //check if user exists
    //confirm add if does not exist
  }
}
