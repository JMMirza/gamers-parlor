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
  credits: any;

  constructor(
    private userProfile: UserProfileService,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private crop: Crop
  ) {}

  ngOnInit() {
    this.getProfile();
    this.getUserCredits();
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

  async getUserCredits() {
    await this.userProfile.userCredits().subscribe(
      (data: any) => {
        console.log(data);
        this.credits = data;
      },
      (error) => {
        console.log(error);
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
          }).then(async (file) => {
            console.log(file.data);
            await this.userProfile
              .updateProfile({ avatar: 'data:image/jpeg;base64,' + file.data })
              .subscribe(
                (data: any) => {
                  console.log(data);
                  this.response = data;
                  this.authService.setUserData(this.response);
                },
                (error) => {
                  console.log(error);
                }
              );
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
