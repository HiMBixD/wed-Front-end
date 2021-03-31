import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-closure-management',
  templateUrl: './closure-management.component.html',
  styleUrls: ['./closure-management.component.scss']
})
export class ClosureManagementComponent implements OnInit {

  constructor(private commonService: CommonService) { }
  p = 1;
deadlineList =[]
  ngOnInit(): void {
    this.commonService.getDeadline({deadlineId: ""}).subscribe(value => {
      console.log(value)
    })
    this.commonService.getDeadlinePeriod({
      date: {
        from: "2021-02-01",
        to: "2021-08-31"
      }
    }).subscribe(value => {
      this.deadlineList = value.data;
      console.log(value)
    })
  }

  isLoading = false;

  filterStart = new FormControl('');
  filterEnd = new FormControl('');
  id = new FormControl('');
  startDate = new FormControl('');
  endDate = new FormControl('');

  setClosureDate() {
    // console.log(this.id.value, this.startDate.value, this.endDate.value)
    this.commonService.setClosureDate({
      action: "create",
      id: this.id.value,
      startDate: this.startDate.value,
      endDate: this.endDate.value
    }).subscribe(value => {
      if (value.success) {
        console.log(value)
      }
      else {
        console.log('well that failed!');
        const message = 'Deadline ' + value.responseMessage.message + ' ' + value.responseMessage.errorCode
        console.log(message)
      }
    })
    this.isLoading == false;
  }

  editDeadline(deadlineId: number) {
    console.log(deadlineId)
    let found = this.deadlineList.find(element => element.deadlineId == deadlineId)
    this.id.setValue(found.deadlineId);
    this.endDate.setValue(found.endDate);
    this.startDate.setValue(found.startDate);
  }

}
