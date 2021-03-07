import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../core/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authServices: AuthService) { }

  ngOnInit(): void {
  }

  onLogOut() {
    this.authServices.logOut();
  }
}
