import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoadingController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;

  validation_messages = {
    email: [
      { type: 'required', message: 'Email is required.' },
      {
        type: 'pattern',
        message: 'Please enter a valid email address.',
      },
    ],
    password: [{ type: 'required', message: 'Password is required.' }],
    password_confirmation: [
      { type: 'required', message: 'Confirm password is required.' },
    ],
  };

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: ['Simon March', [Validators.required]],
      email: [
        'admin@themesbrand.com',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      password: ['123456', [Validators.required]],
      password_confirmation: ['123456', [Validators.required]],
    });
  }

  public doSignup = async () => {
    if (!this.signupForm.valid) {
      console.log('Chuti kar mera puttar');
    } else {
      console.log(this.signupForm.value);

      const loading = await this.loadingCtrl.create({
        message: 'Loading..',
        // duration: 3000,
      });

      loading.present();

      await this.authService.signup(this.signupForm.value).subscribe(
        (data: any) => {
          console.log(data);
          loading.dismiss();
          this.authService.setToken(data.token);
          this.router.navigate(['/']);
        },
        (error) => {
          console.log(error);
          loading.dismiss();
          if (error instanceof HttpErrorResponse) {
            if (error.status == 400) {
              const validationErrors = error.error;
              Object.keys(validationErrors.errors).forEach((prop) => {
                const formControl = this.signupForm.get(prop);
                if (formControl) {
                  console.log(validationErrors.errors[prop]);
                  formControl.setErrors({
                    serverError: validationErrors.errors[prop],
                  });
                } else {
                  // show other errors in list or some where
                }
              });
            }
          }
        }
      );
    }
  };
}
