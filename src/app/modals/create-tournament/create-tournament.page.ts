import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TournamentService } from 'src/app/services/tournament.service';
import { WagersService } from 'src/app/services/wagers.service';
import { ToastService } from 'src/app/services/toast.service';
import * as moment from 'moment';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-tournament',
  templateUrl: './create-tournament.page.html',
  styleUrls: ['./create-tournament.page.scss'],
})
export class CreateTournamentPage implements OnInit {
  segment = 'createTournament';
  response: any;
  games: any = [];
  platforms: any = [];
  tournamentForm: FormGroup;

  validation_messages = {
    // start_date: [{ type: 'required', message: 'Start Date is required.' }],
    // fee: [{ type: 'required', message: 'Fee is required.' }],
    // game_id: [{ type: 'required', message: 'Game is required.' }],
    // platform_id: [{ type: 'required', message: 'Platform is required.' }],
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
    private tournamentService: TournamentService,
    public formBuilder: FormBuilder,
    private wagerService: WagersService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.tournamentForm = this.formBuilder.group({
      name: ['PSL', [Validators.required]],
      game_id: ['2', [Validators.required]],
      platform_id: ['2', [Validators.required]],
      start_date: [moment().toISOString(), [Validators.required]],
      end_date: [moment().toISOString(), [Validators.required]],
      registration_fee: ['1000', [Validators.required]],
      number_of_request: ['10', [Validators.required]],
      published: ['yes', [Validators.required]],
      is_vip: ['yes', [Validators.required]],
      terms_and_condition: ['Some terms and conditions', [Validators.required]],
    });

    this.getWagersData();
  }
  async getWagersData() {
    await this.wagerService.getWagersData().subscribe(
      (data: any) => {
        this.games = data.games;
        console.log(this.games);

        this.platforms = data.platforms;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm(data?) {
    return this.modalCtrl.dismiss(data, 'confirm');
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    this.segment = ev.detail.value;
  }

  public createTournament = async () => {
    if (!this.tournamentForm.valid) {
      console.log('Chuti kar mera puttar');
    } else {
      console.log(this.tournamentForm.value);

      let params = this.tournamentForm.value;
      params.start_date = moment(params.start_date).format('YYYY-MM-DD');
      params.end_date = moment(params.end_date).format('YYYY-MM-DD');

      await this.tournamentService.createTournament(params).subscribe(
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
                const formControl = this.tournamentForm.get(prop);
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
