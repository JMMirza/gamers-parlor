import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  response: any;
  games: any = [];
  platforms: any = [];
  profileForm: FormGroup;

  validation_messages = {
    // start_date: [{ type: 'required', message: 'Start Date is required.' }],
    // fee: [{ type: 'required', message: 'Fee is required.' }],
    // game_id: [{ type: 'required', message: 'Game is required.' }],
    // platform_id: [{ type: 'required', message: 'Platform is required.' }],
  };

  constructor(
    private modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    private toastService: ToastService
  ) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss('', 'confirm');
  }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      date_of_birth: [moment().toISOString(), [Validators.required]],
    });
  }

  public updateProfile = async () => {
    if (!this.profileForm.valid) {
      console.log('Chuti kar mera puttar');
    } else {
      console.log(this.profileForm.value);

      let params = this.profileForm.value;
      params.date_of_birth = moment(params.date_of_birth).format('YYYY-MM-DD');

      // await this.tournamentService.createTournament(params).subscribe(
      //   (data: any) => {
      //     console.log(data);
      //     if (data) {
      //       this.toastService.presentToast('Success');
      //       this.confirm(data);
      //     }
      //   },
      //   (error) => {
      //     console.log(error);
      //     if (error instanceof HttpErrorResponse) {
      //       if (error.status == 400) {
      //         const validationErrors = error.error;
      //         Object.keys(validationErrors.errors).forEach((prop) => {
      //           const formControl = this.profileForm.get(prop);
      //           if (formControl) {
      //             console.log(validationErrors.errors[prop]);
      //             formControl.setErrors({
      //               serverError: validationErrors.errors[prop],
      //             });
      //           } else {
      //             // show other errors in list or some where
      //           }
      //         });
      //       }
      //     }
      //   }
      // );
    }
  };
}
