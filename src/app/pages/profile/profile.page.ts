import { Component, OnInit, ViewChild } from '@angular/core';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { LoadingController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { User } from '../../models/User';
import { EditProfilePage } from 'src/app/modals/edit-profile/edit-profile.page';
import { ModalController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Crop, CropOptions } from '@ionic-native/crop/ngx';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  pageNo = 1;
  response: User = new User();

  constructor(
    private userProfile: UserProfileService,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private crop: Crop
  ) {}

  ngOnInit() {
    this.getProfile();
  }

  async getProfile() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      // duration: 3000,
    });

    loading.present();

    await this.userProfile.getProfile().subscribe(
      (data: any) => {
        console.log(data);
        this.response = data;
        loading.dismiss();
      },
      (error) => {
        console.log(error);
        loading.dismiss();
      }
    );
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: EditProfilePage,
      componentProps: { user: this.response },
    });
    modal.present();
    // modal.componentInstance.user = this.response;
    const { data, role } = await modal.onWillDismiss();

    console.log(data);
    this.response = data;
  }

  async getPhoto() {
    try {
      const profilePicture = await Camera.getPhoto({
        quality: 50,
        width: 400,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt,
      });

      console.log(profilePicture.path);

      // this.formData.team_logo =
      //   'data:image/jpeg;base64,' + profilePicture.base64String;

      await this.crop.crop(profilePicture.path).then(
        (res) => {
          Filesystem.readFile({
            path: res,
          }).then((file) => {
            console.log(file.data);
            // this.formData.team_logo = 'data:image/jpeg;base64,' + file.data;
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
}
