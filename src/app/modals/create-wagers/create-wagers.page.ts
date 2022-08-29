import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-wagers',
  templateUrl: './create-wagers.page.html',
  styleUrls: ['./create-wagers.page.scss'],
})
export class CreateWagersPage implements OnInit {

  segment = 'createTeam';

  constructor(private modalCtrl: ModalController) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss('', 'confirm');
  }

  ngOnInit() {
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    this.segment = ev.detail.value;
  }

}

