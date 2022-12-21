import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';
import { WagersService } from 'src/app/services/wagers.service';

@Component({
  selector: 'app-wager-requests',
  templateUrl: './wager-requests.page.html',
  styleUrls: ['./wager-requests.page.scss'],
})
export class WagerRequestsPage implements OnInit {
  @Input() wagerPostRequest: any;
  constructor(
    private modalCtrl: ModalController,
    private wagerService: WagersService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    // console.log(this.wagerPostRequest[0].user.name);
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm(data?) {
    return this.modalCtrl.dismiss(data, 'confirm');
  }

  async acceptRequest(id) {
    await this.wagerService.acceptRequest({ wager_request_id: id }).subscribe(
      async (data: any) => {
        console.log(data);
        this.toastService.presentToast('Success');
        this.confirm(data);
        // this.response = data.wagers;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  async rejectRequest(id) {
    await this.wagerService.rejectRequest({ wager_request_id: id }).subscribe(
      async (data: any) => {
        console.log(data);
        this.wagerPostRequest = data;
        // this.response = data.wagers;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
