import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { UserDetailsService } from '../../services/user-details.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  val;
  constructor(private commonService: CommonService, private userDetails: UserDetailsService) { }

  ngOnInit(): void {
    this.commonService.getMyInfo({}).subscribe(val => {
      if (val) {
        this.val = val;
        console.log(this.val);
        console.log(val.data.userName);
        this.userDetails.setUserDetails(val.data);
      }
    });
  }

}
