import { LocationStrategy } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Crop, CropOptions } from '@ionic-native/crop/ngx';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { MyTeamsService } from 'src/app/services/my-teams.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.page.html',
  styleUrls: ['./create-team.page.scss'],
})
export class CreateTeamPage implements OnInit {
  segment = 'createTeams';
  status: any;
  users: any = [];
  selectedUsers: any = [];
  formData = {
    players: null,
    team_name: null,
    team_logo: null,
  };

  step = 0;

  segments = [
    {
      label: 'create team',
      value: 'create-team',
    },
    {
      label: 'add players',
      value: 'add-players',
    },
  ];

  validation_messages = {
    // start_date: [{ type: 'required', message: 'Start Date is required.' }],
    name: [{ type: 'required', message: 'Name is required.' }],
    user_id: [{ type: 'required', message: 'User is required.' }],
    number_of_memeber: [
      { type: 'required', message: 'Number of member is required.' },
    ],
  };
  constructor(
    private userService: UserProfileService,
    private loadingCtrl: LoadingController,
    private toastService: ToastService,
    private modalCtrl: ModalController,
    private teamService: MyTeamsService,
    private crop: Crop
  ) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm(data?) {
    return this.modalCtrl.dismiss(data, 'confirm');
  }

  ngOnInit() {}

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    this.segment = ev.detail.value;
  }

  next() {
    this.step++;
  }

  previous() {
    this.step--;
  }

  async searchPlayers(event) {
    await this.userService
      .searchUser({ user_name: event.detail.value })
      .subscribe(
        (data: any) => {
          console.log(data);
          this.users = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  async allUser() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      // duration: 3000,
    });

    loading.present();

    await this.userService.getAllUser().subscribe(
      (data: any) => {
        console.log(data);
        this.users = data;
        loading.dismiss();
      },
      (error) => {
        console.log(error);
        loading.dismiss();
      }
    );
  }

  async uploadLogo() {
    try {
      const profilePicture = await Camera.getPhoto({
        quality: 50,
        width: 400,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt,
      });

      console.log(profilePicture.path);

      this.formData.team_logo =
        'data:image/jpeg;base64,' + profilePicture.base64String;

      await this.crop.crop(profilePicture.path).then(
        (res) => {
          Filesystem.readFile({
            path: res,
          }).then((file) => {
            console.log(file.data);
            this.formData.team_logo = 'data:image/jpeg;base64,' + file.data;
          });
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  selectUser(user, index) {
    this.selectedUsers.push(user);
    this.status = !this.status;
    this.users.splice(index, 1);
  }

  removeUser(user, index) {
    this.selectedUsers.splice(index, 1);
    this.users.push(user);
  }

  async createTeam() {
    this.formData.players = this.selectedUsers;
    console.log(this.formData);
    await this.teamService.createLadderTeam(this.formData).subscribe(
      (data: any) => {
        console.log(data);
        this.users = data;
        this.toastService.presentToast('Success');
        this.confirm(data);
      },
      (error) => {
        console.log(error);
        this.toastService.presentAlert(error.message);
      }
    );
  }
}
