import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoadingController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
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
    private loadingCtrl: LoadingController,
    private router: Router
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

  public doLogin = async () => {
    if (!this.loginForm.valid) {
      console.log('Chuti kar mera puttar');
    } else {
      console.log(this.loginForm.value);

      const loading = await this.loadingCtrl.create({
        message: 'Authenticatng..',
        // duration: 3000,
      });

      loading.present();

      await this.authService.login(this.loginForm.value).subscribe(
        (data: any) => {
          console.log(data.user);
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
                const formControl = this.loginForm.get(prop);
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
