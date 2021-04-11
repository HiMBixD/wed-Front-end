import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AssignmentDetailsService } from 'src/app/auth-required-pages/services/assignment-details.service';
import { CommonService } from 'src/app/auth-required-pages/services/common.service';

@Component({
  selector: 'app-submissions-evaluation',
  templateUrl: './submissions-evaluation.component.html',
  styleUrls: ['./submissions-evaluation.component.scss']
})
export class SubmissionsEvaluationComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private commonService: CommonService,
  private asmService: AssignmentDetailsService) { }

  ngOnInit(): void {
    this.asm$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.commonService.getAssignmentById(
          {
            assignmentId: +params.get('asmId')
          }
        )
      })
    );
    
    this.asm$.subscribe(value => {
      this.assignmentDetails = value.data;
      console.log(this.assignmentDetails);
      //get all submissions from this ID
      this.commonService.searchSubmission({
        username: '',
        assignmentId: this.assignmentDetails.assignmentId,
        status: null,
      }).subscribe(
        value => {
          // console.log('search submission result')
          console.log(value.data)
          this.submissionList = value.data;
        }
      )
    })

    
  }
  asm$;
  assignmentDetails;
  submissionList;
  filesList;
  currentUser;
}
