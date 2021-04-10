import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-submissions-evaluation',
  templateUrl: './submissions-evaluation.component.html',
  styleUrls: ['./submissions-evaluation.component.scss']
})
export class SubmissionsEvaluationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  filesList;
  currentUser;
}
