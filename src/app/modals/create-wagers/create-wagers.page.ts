import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { WagersService } from 'src/app/services/wagers.service';
import { ToastService } from 'src/app/services/toast.service';
import * as moment from 'moment';

@Component({
  selector: 'app-create-wagers',
  templateUrl: './create-wagers.page.html',
  styleUrls: ['./create-wagers.page.scss'],
})
export class CreateWagersPage implements OnInit {
  segment = 'createTeam';
  response: any;
  games: any = [];
  platforms: any = [];
  wagerForm: FormGroup;

  validation_messages = {
    // start_date: [{ type: 'required', message: 'Start Date is required.' }],
    fee: [{ type: 'required', message: 'Fee is required.' }],
    game_id: [{ type: 'required', message: 'Game is required.' }],
    platform_id: [{ type: 'required', message: 'Platform is required.' }],
  };

  gameSelectOptions = {
    header: 'Games',
    translucent: true,
  };

  platformSelectOptions = {
    header: 'Platforms',
    translucent: true,
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
    this.wagerForm = this.formBuilder.group({
      start_date: ['', [Validators.required]],
      fee: ['', [Validators.required]],
      game_id: [0, [Validators.required]],
      platform_id: [0, [Validators.required]],
      terms_and_condition: ['N/A'],
    });

    this.getWagersData();
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    this.segment = ev.detail.value;
  }

  async getWagersData() {
    await this.wagerService.getWagersData().subscribe(
      (data: any) => {
        console.log(data);
        this.games = data.games;
        this.platforms = data.platforms;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public createWager = async () => {
    if (!this.wagerForm.valid) {
      console.log('Chuti kar mera puttar');
    } else {
      console.log(this.wagerForm.value);

      let params = this.wagerForm.value;
      params.start_date = moment(params.start_date).format('YYYY-MM-DD');

      await this.wagerService.createWagerPost(params).subscribe(
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
                const formControl = this.wagerForm.get(prop);
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
