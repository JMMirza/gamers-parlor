import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';
import { WagersService } from 'src/app/services/wagers.service';
import * as moment from 'moment';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-wager-post-participate',
  templateUrl: './wager-post-participate.page.html',
  styleUrls: ['./wager-post-participate.page.scss'],
})
export class WagerPostParticipatePage implements OnInit {
  wagerRequestForm: FormGroup;
  @Input() wagerPostId: any;

  validation_messages = {
    request_time: [{ type: 'required', message: 'Start Date is required.' }],
  };

  constructor(
    private modalCtrl: ModalController,
    private wagerService: WagersService,
    public formBuilder: FormBuilder,
    private toastService: ToastService
  ) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm(data?) {
    return this.modalCtrl.dismiss(data, 'confirm');
  }

  ngOnInit() {
    this.wagerRequestForm = this.formBuilder.group({
      request_time: ['', [Validators.required]],
    });
  }

  public createWagerRequest = async () => {
    if (!this.wagerRequestForm.valid) {
      console.log('Chuti kar mera puttar');
    } else {
      console.log(this.wagerRequestForm.value);

      let params = this.wagerRequestForm.value;
      params.request_time = moment(params.request_time).format('YYYY-MM-DD');
      params.wager_post_id = this.wagerPostId;
      console.log(params);
      await this.wagerService.createWagerRequestPost(params).subscribe(
        (data: any) => {
          console.log(data);
          if (data) {
            this.toastService.presentToast('Success');
            this.confirm(data);
          }
        },
        (error) => {
          console.log(error);
          if (error instanceof HttpErrorResponse) {
            if (error.status == 400) {
              const validationErrors = error.error;
              Object.keys(validationErrors.errors).forEach((prop) => {
                const formControl = this.wagerRequestForm.get(prop);
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
