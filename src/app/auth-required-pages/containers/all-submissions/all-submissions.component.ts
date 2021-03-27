import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-submissions',
  templateUrl: './all-submissions.component.html',
  styleUrls: ['./all-submissions.component.scss']
})
export class AllSubmissionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  p: number = 1

  mockSelected = [
    {
      topic: 'Tech trend',
      username: 'mimi123',
      date: '21/2/2021',
      status: 'Accepted',
      comments: 5,
    },
    {
      topic: 'Tech trend',
      username: 'hihi999',
      date: '21/2/2021',
      status: 'Accepted',
      comments: 2,
    },
    {
      topic: 'Future of AI',
      username: 'ha2001',
      date: '5/3/2021',
      status: 'Rejected',
      comments: 3,
    },
    {
      topic: 'Future of AI',
      username: 'myEye2080',
      date: '9/3/2021',
      status: 'Accepted',
      comments: 1,
    },
  ]
}
