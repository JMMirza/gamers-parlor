import { Component, OnInit, ViewChild } from '@angular/core';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { LoadingController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { User } from '../../models/User';
import { EditProfilePage } from 'src/app/modals/edit-profile/edit-profile.page';
import { ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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
    private camera: Camera
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
        this.authService.setUser(data.name, data.email, data.avatar_url);
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
      const options: CameraOptions = {
        quality: 50,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
      };

      this.camera.getPicture(options).then(
        (imageData) => {
          let base64Image = 'data:image/jpeg;base64,' + imageData;
        },
        (err) => {
          // Handle error
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
}
