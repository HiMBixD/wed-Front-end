import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssignmentDetailsService {

  constructor() { }
  assignment = [];
  setAssignment(asm) {
    this.assignment = asm;
    console.log(asm)
  }
  getAssignment() {
    return this.assignment
  }
}
