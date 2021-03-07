import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]

  });

  constructor(private fb: FormBuilder,
              // private translate: @ngx-translate/core
              private authService: AuthService,
              private router: Router,
              private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  onLogin(loginForm: FormGroup) {
    this.authService.login(loginForm.value).pipe().subscribe(value => {
      if (value) {
        if (value.success) {
          this.toastrService.success('Login success');
          this.router.navigate(['/']);

        } else {
          const message = 'User ' + value.responseMessage.message + ' ' + value.responseMessage.errorCode
          this.toastrService.error(message);
        }
      }
    });
  }

}
