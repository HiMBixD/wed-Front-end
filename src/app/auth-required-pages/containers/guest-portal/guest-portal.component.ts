import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-guest-portal',
  templateUrl: './guest-portal.component.html',
  styleUrls: ['./guest-portal.component.scss']
})
export class GuestPortalComponent implements OnInit {

  constructor(private commonService: CommonService) {
    
  }

  ngOnInit(): void {
    this.commonService.getFaculties().subscribe(
      f => {
        if (f?.success) {
          this.facultyList = f.data;
        }
      }
    );
    this.commonService.getMyInfo({}).subscribe(val => {
      if (val) {
        this.userDetails = val.data;
        console.log(this.userDetails.userName);
      }
    });
  }

  userDetails;
  facultyList;
  getFacultyName(facultyId) {
    if (facultyId == null) {
      return null;
    }
    else {
      return this.facultyList.find(faculty => +faculty.facultyId === +facultyId);
    }
  }
}
