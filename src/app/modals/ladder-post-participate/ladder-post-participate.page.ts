import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';
import { LadderService } from 'src/app/services/ladder.service';

@Component({
  selector: 'app-ladder-post-participate',
  templateUrl: './ladder-post-participate.page.html',
  styleUrls: ['./ladder-post-participate.page.scss'],
})
export class LadderPostParticipatePage implements OnInit {
  teams: any = [];
  credits: number;
  @Input() ladderPostId: any;

  constructor(
    private modalCtrl: ModalController,
    private ladderService: LadderService,
    private toastService: ToastService
  ) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm(data?) {
    return this.modalCtrl.dismiss(data, 'confirm');
  }

  ngOnInit() {
    this.getLaddersData();
  }

  async getLaddersData() {
    await this.ladderService.getLaddersData().subscribe(
      (data: any) => {
        console.log(data.teams);
        this.teams = data.teams;
        this.credits = data.credits;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public createLadderRequest = async (id) => {
    await this.ladderService
      .createLadderRequestPost({
        team_id: id,
        ladder_post_id: this.ladderPostId,
      })
      .subscribe(
        (data: any) => {
          console.log(data);
          if (data) {
            this.toastService.presentToast('Success');
            this.confirm(data);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };
}
