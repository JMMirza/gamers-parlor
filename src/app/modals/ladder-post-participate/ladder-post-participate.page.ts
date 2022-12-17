import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';
import * as moment from 'moment';
import { HttpErrorResponse } from '@angular/common/http';
import { LadderService } from 'src/app/services/ladder.service';

@Component({
  selector: 'app-ladder-post-participate',
  templateUrl: './ladder-post-participate.page.html',
  styleUrls: ['./ladder-post-participate.page.scss'],
})
export class LadderPostParticipatePage implements OnInit {
  ladderRequestForm: FormGroup;
  @Input() ladderPostId: any;

  validation_messages = {
    request_time: [{ type: 'required', message: 'Start Date is required.' }],
  };

  constructor(
    private modalCtrl: ModalController,
    private ladderService: LadderService,
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
    this.ladderRequestForm = this.formBuilder.group({
      request_time: ['', [Validators.required]],
    });
  }

  public createWagerRequest = async () => {
    if (!this.ladderRequestForm.valid) {
      console.log('Chuti kar mera puttar');
    } else {
      console.log(this.ladderRequestForm.value);

      let params = this.ladderRequestForm.value;
      params.request_time = moment(params.request_time).format('YYYY-MM-DD');
      params.wager_post_id = this.ladderPostId;
      console.log(params);
      
      await this.ladderService.createLadderRequestPost(params).subscribe(
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
                const formControl = this.ladderRequestForm.get(prop);
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
