import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { MyTeamsService } from 'src/app/services/my-teams.service';

@Component({
  selector: 'app-participate-tournament',
  templateUrl: './participate-tournament.page.html',
  styleUrls: ['./participate-tournament.page.scss'],
})
export class ParticipateTournamentPage implements OnInit {
  segment = 'createTeams';
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

  constructor(
    private userService: UserProfileService,
    private teamService: MyTeamsService,
    private loadingCtrl: LoadingController,
    private camera: Camera
  ) {}

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
      const options: CameraOptions = {
        quality: 50,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
      };

      this.camera.getPicture(options).then(
        (imageData) => {
          this.formData.team_logo = 'data:image/jpeg;base64,' + imageData;
        },
        (err) => {
          // Handle error
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  selectUser(user, index) {
    this.selectedUsers.push(user);
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
        this.users = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
