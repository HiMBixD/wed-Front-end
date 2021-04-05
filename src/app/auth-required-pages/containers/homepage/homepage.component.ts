import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { UserDetailsService } from '../../services/user-details.service';
import { facultyInterface } from '../../interfaces/interfaces';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  val;
  constructor(private commonService: CommonService,
    private userService: UserDetailsService,) { }

  ngOnInit(): void {
    this.commonService.getMyInfo({}).subscribe(val => {
      if (val) {
        this.val = val;
        console.log(this.val);
        console.log(val.data.userName);
        // this.userDetails.setUserDetails(val.data);
      }
    });

    this.commonService.getFaculties().subscribe(
      f => {
        if (f?.success) {
          this.facultyList = f.data;
          // this.userService.setFacultyName(this.getFacultyName(this.val.data.facultyId).facultyName);
        }
      }
    );
  }
  facultyList: facultyInterface[] = [];
  getFacultyName(facultyId) {
    return this.facultyList.find(faculty => +faculty.facultyId === +facultyId);
  }

}
