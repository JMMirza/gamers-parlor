import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { LadderService } from 'src/app/services/ladder.service';
import { ToastService } from 'src/app/services/toast.service';
import * as moment from 'moment';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-ladders',
  templateUrl: './create-ladders.page.html',
  styleUrls: ['./create-ladders.page.scss'],
})
export class CreateLaddersPage implements OnInit {
  segment = 'createLadder';
  response: any;
  games: any = [];
  platforms: any = [];
  teams: any = [];
  ladderForm: FormGroup;

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

  teamsSelectOptions = {
    header: 'Teams',
    translucent: true,
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
    this.ladderForm = this.formBuilder.group({
      start_date: ['', [Validators.required]],
      fee: ['', [Validators.required]],
      game_id: [0, [Validators.required]],
      platform_id: [0, [Validators.required]],
      team_id: [0, [Validators.required]],
      terms_and_condition: ['N/A'],
    });

    this.getLaddersData();
  }
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    this.segment = ev.detail.value;
  }

  async getLaddersData() {
    await this.ladderService.getLaddersData().subscribe(
      (data: any) => {
        console.log(data);
        this.games = data.games;
        this.platforms = data.platforms;
        this.teams = data.teams;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public createLadder = async () => {
    console.log(this.ladderForm.value);
    if (!this.ladderForm.valid) {
      console.log('Chuti kar mera puttar');
    } else {
      console.log(this.ladderForm.value);

      let params = this.ladderForm.value;
      params.start_date = moment(params.start_date).format('YYYY-MM-DD');

      await this.ladderService.createLadderPost(params).subscribe(
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
                const formControl = this.ladderForm.get(prop);
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
