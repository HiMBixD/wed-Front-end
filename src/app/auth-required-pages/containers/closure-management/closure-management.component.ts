import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import * as moment from 'moment'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-closure-management',
  templateUrl: './closure-management.component.html',
  styleUrls: ['./closure-management.component.scss']
})
export class ClosureManagementComponent implements OnInit {

  constructor(private commonService: CommonService, private fb: FormBuilder, private toastrService: ToastrService) { }

  p = 1;
  deadlineList = []
  ngOnInit(): void {
    this.commonService.getDeadline({ deadlineId: "" }).subscribe(value => {
      console.log(value)
    })

    // this.commonService.getDeadlinePeriod({
    //   date: {
    //     from: "1970-01-01",
    //     to: "",
    //   }
    // }).subscribe(value => {
    //   this.deadlineList = value.data;
    //   console.log(value)
    // });
  }
  closureForm = this.fb.group({
    id: [{value: '', disabled: true}, Validators.required, ],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
  });


  getDeadlineSpan(startDate, endDate) {
    this.commonService.getDeadlinePeriod({
      date: {
        from: startDate,
        to: endDate
      }
    }).subscribe(value => {
      this.deadlineList = value.data;
      console.log(value)
    })
  }
  
  isLoading = false;

  filterStart = new FormControl('');
  filterEnd = new FormControl('');

  setClosureDate() {
    // console.log(this.id.value, this.startDate.value, this.endDate.value)
    if (this.closureForm.controls['startDate'].value > this.closureForm.controls['endDate'].value) {
      this.toastrService.error('End Date should not occur before Start Date. Please try again.')
    }
    else {
      this.commonService.setClosureDate({
        action: "create",
        id: this.closureForm.get("id").value,
        startDate: this.closureForm.get("startDate").value,
        endDate: this.closureForm.get("endDate").value
      }).subscribe(value => {
        if (value.success) {
          console.log(value)
          this.toastrService.success(`Set closure date success! ${this.closureForm.get("startDate").value} - ${this.closureForm.get("endDate").value}`)
        }
        else {
          console.log('well that failed!');
          const message = 'Failed! Failed to set deadline ' + value.responseMessage.message + ' ' + value.responseMessage.errorCode
          this.toastrService.error(message)
        }
      })
      this.isLoading == false;
    }
  }
  modifyClosureDate() {
    if (this.closureForm.controls['startDate'].value > this.closureForm.controls['endDate'].value) {
      this.toastrService.error('End Date should not occur before Start Date. Please try again.')
    }
    if (this.closureForm.valid && this.closureForm.controls['startDate'].value < this.closureForm.controls['endDate'].value) {
      this.commonService.setClosureDate({
        action: "set",
        id: this.closureForm.get("id").value,
        startDate: this.closureForm.get("startDate").value,
        endDate: this.closureForm.get("endDate").value
      }).subscribe(value => {
        if (value.success) {
          console.log(value)
          this.toastrService.success('Updated successfully!')
        }
        else {
          console.log('well that failed!');
          const message = 'Deadline ' + value.responseMessage.message + ' ' + value.responseMessage.errorCode
          console.log(message)
          this.toastrService.error(message);
        }
      })
    }
  }
/**
 * Select to edit
 * @param deadline 
 */
  editDeadline(deadline) {
    console.log(deadline);
    const startDate = moment(deadline.startDate).format('YYYY-MM-DD');
    const endDate = moment(deadline.endDate).format('YYYY-MM-DD');
    this.closureForm.patchValue({
      id: deadline.deadlineId,
      endDate,
      startDate
    })
    // this.closureForm.get("id").setValue(deadline.deadlineId);
    // this.endDate.setValue(ed);
    // this.startDate.setValue(sd);
  }

  onSearch() {
    console.log(this.filterEnd.value)
    this.commonService.getDeadlinePeriod({
      date: {
        from: this.filterStart.value,
        to: this.filterEnd.value
      }
    }).subscribe(value => {
      if (value.data.length > 0) {
        this.deadlineList = value.data;
        console.log(value)
      }
      else {
        this.toastrService.error(`Found no deadline that starts and ends between ${this.filterStart.value} and ${this.filterEnd.value}. Please try a wider search range.`)
      }
    })
  }
}
