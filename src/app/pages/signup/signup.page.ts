import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoadingController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  loginForm: FormGroup;

  validation_messages = {
    email: [
      { type: 'required', message: 'Email is required.' },
      {
        type: 'pattern',
        message: 'Please enter a valid email address.',
      },
    ],
    password: [{ type: 'required', message: 'Password is required.' }],
  };

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [
        'admin@themesbrand.com',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      password: ['123456', [Validators.required]],
    });
  }
}
