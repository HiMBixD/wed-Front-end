import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../core/service/auth.service';
import { facultyInterface } from '../../interfaces/interfaces';
import { CommonService } from '../../services/common.service';
import { UserDetailsService } from '../../services/user-details.service';

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
  @Input() userData;
  // facultyName;
  /////////////////////////////////////////////
  ngOnInit(): void {
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
    return this.facultyList.find(faculty => +faculty.facultyId === +facultyId);
  }
}
