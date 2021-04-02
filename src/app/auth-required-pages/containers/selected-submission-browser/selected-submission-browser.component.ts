import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-selected-submission-browser',
  templateUrl: './selected-submission-browser.component.html',
  styleUrls: ['./selected-submission-browser.component.scss']
})
export class SelectedSubmissionBrowserComponent implements OnInit {

  constructor(private commonService: CommonService) { }

  selectedSubmissions = []
  ngOnInit(): void {
    this.commonService.searchSubmission({
      username: '',
      assignmentId: null,
      status: 1
    }).subscribe(value => {
      if (value) {
        this.selectedSubmissions = value.data;
        console.log(this.selectedSubmissions)
      }
    })
  }
  p: number = 1

  mockSelected: selectedSubmission[] = [
    {
      topic: 'Tech trend',
      username: 'mimi123',
      date: '21/2/2021'
    },
    {
      topic: 'Tech trend',
      username: 'hihi999',
      date: '21/2/2021'
    },
    {
      topic: 'Future of AI',
      username: 'ha2001',
      date: '5/3/2021'
    },
    {
      topic: 'Future of AI',
      username: 'myEye2080',
      date: '9/3/2021'
    },
  ]
}
interface selectedSubmission {
  topic: string,
  username: string,
  date: string,
}
