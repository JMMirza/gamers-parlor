import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-my-matches',
  templateUrl: './my-matches.page.html',
  styleUrls: ['./my-matches.page.scss'],
})
export class MyMatchesPage implements OnInit {
  @Input() team: any;
  @Input() tournamentID: any;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    console.log(this.team, this.tournamentID);
  }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm(data?) {
    return this.modalCtrl.dismiss(data, 'confirm');
  }
}
