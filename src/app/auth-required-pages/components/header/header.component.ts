import { Component, Input, OnInit } from '@angular/core';
import {AuthService} from '../../../core/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authServices: AuthService) { }
  @Input() userData;
  ngOnInit(): void {
  }

  onLogOut() {
    this.authServices.logOut();
  }
}
