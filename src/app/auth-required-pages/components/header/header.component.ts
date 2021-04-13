import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../core/service/auth.service';
import { facultyInterface } from '../../interfaces/interfaces';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authServices: AuthService,
    private commonService: CommonService,
    // private userDetails: UserDetailsService,
  ) { }

  ///////////////////////////////////////////
userData;
  // facultyName;
  /////////////////////////////////////////////
  ngOnInit(): void {
    this.commonService.getMyInfo({}).subscribe(
      value => {
        this.userData = value.data
      }
    )
    this.commonService.getFaculties().subscribe(
      f => {
        if (f?.success) {
          this.facultyList = f.data;
        }
      }
    );
    // this.facultyName = this.userDetails.getFacultyName;
  }

  onLogOut() {
    this.authServices.logOut();
  }
  facultyList: facultyInterface[] = [];
  getFacultyName(facultyId) {
    let name = this.facultyList.find(faculty => +faculty.facultyId === +facultyId);
    return name.facultyName;
  }
}