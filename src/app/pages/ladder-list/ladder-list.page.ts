import { Component, OnInit, ViewChild } from '@angular/core';
import {
  IonInfiniteScroll,
  LoadingController,
  ModalController,
  ToastController,
  AlertController,
} from '@ionic/angular';
import { CreateLaddersPage } from 'src/app/modals/create-ladders/create-ladders.page';
import { LadderPostParticipatePage } from 'src/app/modals/ladder-post-participate/ladder-post-participate.page';
import { LadderRequestPage } from 'src/app/modals/ladder-request/ladder-request.page';
import { LadderService } from 'src/app/services/ladder.service';
import { MyTeamsService } from 'src/app/services/my-teams.service';
import { ToastService } from 'src/app/services/toast.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Crop } from '@ionic-native/crop/ngx';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

@Component({
  selector: 'app-ladder-list',
  templateUrl: './ladder-list.page.html',
  styleUrls: ['./ladder-list.page.scss'],
})
export class LadderListPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  pageNo = 1;
  response: any;
  platforms: any;
  ladderPostRequestList: any;
  segment = 'ladder_matches';

  filters = {
    matchCategory: '',
    type: 'ladder_matches',
  };
  constructor(
    private ladderService: LadderService,
    private loadingCtrl: LoadingController,
    private toastService: ToastService,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private crop: Crop
  ) {}

  ngOnInit() {
    this.listLadders(this.filters);
  }

  async listLadders(params?) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      // duration: 3000,
    });

    this.response = [];
    loading.present();

    await this.ladderService.listLadders(params).subscribe(
      (data: any) => {
        console.log(data);
        this.response = data.ladders;
        this.platforms = data.platforms;
        loading.dismiss();
      },
      (error) => {
        console.log(error);
        loading.dismiss();
      }
    );
  }

  showGameRules(game) {
    // console.log(game);
    this.toastService.presentAlert(game.terms_and_condition);
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: CreateLaddersPage,
    });
    modal.present();

    await modal.onWillDismiss().then((data) => {
      console.log(data);
      this.listLadders();
    });
  }

  async presentAlert(item) {
    const alert = await this.alertController.create({
      header: 'Confirmation!',
      message: `This match requires a payment of $${item.fee}`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Confirm',
          role: 'confirm',
          handler: async () => {
            this.ladderPostRequest(item.id);
            // await this.ladderService
            //   .createLadderRequestPost({
            //     ladder_post_id: item.id,
            //     request_time: '2022-10-02',
            //   })
            //   .subscribe(
            //     (data: any) => {
            //       console.log(data);
            //       if (data) {
            //         this.toastService.presentToast('Success');
            //       }
            //     },
            //     (error) => {
            //       console.log(error);
            //     }
            //   );
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  async ladderPostRequest(id) {
    const modal = await this.modalCtrl.create({
      component: LadderPostParticipatePage,
      componentProps: { ladderPostId: id },
    });
    modal.present();

    await modal.onWillDismiss().then((data) => {
      console.log(data);
      this.listLadders();
    });
  }

  async ladderPostListRequest(id) {
    await this.ladderService
      .listLadderRequest({ ladder_post_id: id })
      .subscribe(
        async (data: any) => {
          console.log(data);
          this.ladderPostRequestList = data;
          // this.response = data.wagers;
          const modal = await this.modalCtrl.create({
            component: LadderRequestPage,
            componentProps: { ladderPostRequest: this.ladderPostRequestList },
          });
          modal.present();
          await modal.onWillDismiss().then((data) => {
            console.log(data);
            this.listLadders();
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  async loadMore(event) {
    this.pageNo++;
    await this.ladderService.listLadders({ page_no: this.pageNo }).subscribe(
      (data: any) => {
        console.log(data);

        for (var item of data.ladders) {
          this.response.push(item);
        }

        event.target.complete();
      },
      (error) => {
        console.log(error);
        event.target.complete();
      }
    );
  }

  public async doRefresh(event) {
    this.pageNo = 1;
    await this.ladderService.listLadders({ page_no: this.pageNo }).subscribe(
      (data: any) => {
        console.log(data);
        this.response = data.ladders;
        event.target.complete();
      },
      (error) => {
        console.log(error);
        event.target.complete();
      }
    );
  }

  async segmentChanged(ev) {
    console.log(ev.detail.value);

    this.filters.matchCategory = ev.detail.value;
    this.segment = ev.detail.value;
    await this.listLadders(this.filters);
  }

  async listMatches(matchCategory) {
    console.log(matchCategory);
    this.filters.matchCategory = matchCategory;
    // await this.listWagers(this.filters);
  }
  async getPhoto(ladder_post_id) {
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
            await this.ladderService
              .uploadLadderPostResult({
                proof: 'data:image/jpeg;base64,' + file.data,
                ladder_post_id: ladder_post_id,
              })
              .subscribe(
                (data: any) => {
                  console.log(data);
                  this.response = data;
                  // this.authService.setUserData(this.response);
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
