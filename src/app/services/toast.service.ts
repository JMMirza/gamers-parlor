import { Injectable } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(
    public toastController: ToastController,
    public alertController: AlertController
  ) {}

  async presentToast(infoMessage: string) {
    const toast = await this.toastController.create({
      message: infoMessage,
      duration: 8000,
      position: 'top',
      cssClass: 'toast-custom-class',
    });
    toast.present();
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      //   header: 'Note',
      // subHeader: 'Subtitle',
      message: message,
      buttons: ['Close'],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
