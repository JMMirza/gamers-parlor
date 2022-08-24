import { Component, OnInit, ViewChild } from '@angular/core';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { LoadingController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { User } from '../../models/User';

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
    private loadingCtrl: LoadingController
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
}
