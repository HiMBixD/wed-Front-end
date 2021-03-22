import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selected-submission-browser',
  templateUrl: './selected-submission-browser.component.html',
  styleUrls: ['./selected-submission-browser.component.scss']
})
export class SelectedSubmissionBrowserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  p : number = 1

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
interface selectedSubmission  {
  topic: string,
  username: string,
  date: string,
}
