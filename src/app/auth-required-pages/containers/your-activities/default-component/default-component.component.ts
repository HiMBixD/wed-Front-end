import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-default-component',
  templateUrl: './default-component.component.html',
  styleUrls: ['./default-component.component.scss']
})
export class DefaultComponentComponent implements OnInit {
  url = `${environment.apiUrl}/file/unsecure/download-root`;
  constructor() { }

  ngOnInit(): void {
  }

}
