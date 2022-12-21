import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LadderService } from 'src/app/services/ladder.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-ladder-request',
  templateUrl: './ladder-request.page.html',
  styleUrls: ['./ladder-request.page.scss'],
})
export class LadderRequestPage implements OnInit {
  @Input() ladderPostRequest: any;
  constructor(
    private modalCtrl: ModalController,
    private ladderService: LadderService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    // console.log(this.ladderPostRequest[0].user.name);
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm(data?) {
    return this.modalCtrl.dismiss(data, 'confirm');
  }

  async acceptRequest(id) {
    await this.ladderService.acceptRequest({ ladder_request_id: id }).subscribe(
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
    await this.ladderService.rejectRequest({ ladder_request_id: id }).subscribe(
      async (data: any) => {
        console.log(data);
        this.ladderPostRequest = data;
        // this.response = data.wagers;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
