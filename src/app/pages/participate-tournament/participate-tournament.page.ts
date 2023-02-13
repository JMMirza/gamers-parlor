import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { LocationStrategy } from '@angular/common';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { MyTeamsService } from 'src/app/services/my-teams.service';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Crop, CropOptions } from '@ionic-native/crop/ngx';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-participate-tournament',
  templateUrl: './participate-tournament.page.html',
  styleUrls: ['./participate-tournament.page.scss'],
})
export class ParticipateTournamentPage implements OnInit {
  segment = 'createTeams';
  status: any;
  users: any = [];
  selectedUsers: any = [];
  formData = {
    players: null,
    team_name: null,
    team_logo: null,
    tournament_id: '0',
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

  constructor(
    private userService: UserProfileService,
    private teamService: MyTeamsService,
    private loadingCtrl: LoadingController,
    private activatedRoute: ActivatedRoute,
    private locationStrategy: LocationStrategy,
    private crop: Crop,
    private toastService: ToastService,
  ) {}

  ngOnInit() {
    this.formData.tournament_id =
      this.activatedRoute.snapshot.paramMap.get('tournamentId');
  }

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
    await this.teamService.createTeam(this.formData).subscribe(
      (data: any) => {
        console.log(data);
        if(data.success == 1){
          this.users = data;
          this.locationStrategy.back();
        }else{
          // alert(data.msg);
          this.toastService.presentAlert(data.msg);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
