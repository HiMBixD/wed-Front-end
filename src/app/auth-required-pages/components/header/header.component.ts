import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../core/service/auth.service';
import { facultyInterface } from '../../containers/interface mock data/interfaces';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authServices: AuthService, private commonService: CommonService,) { }
  @Input() userData;
  ngOnInit(): void {
    this.commonService.getFaculties().subscribe(
      f => {
        if (f?.success) {
          this.facultyList = f.data;
        }
      }
    )
  }

  onLogOut() {
    this.authServices.logOut();
  }
  facultyList: facultyInterface[] = [];
  getFacultyName(facultyId) {
    return this.facultyList.find(faculty => +faculty.facultyId === +facultyId);
  }
}
