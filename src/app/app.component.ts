import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { MenuController } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { FcmService } from './services/fcm.service';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  response: any;
  public appPages = [
    { title: 'Home', url: 'home', icon: 'home' },
    // { title: 'signup', url: 'signup', icon: 'home' },
    { title: 'My Tournaments', url: 'my-tournaments', icon: 'trophy' },
    {
      title: 'Tournament Results',
      url: 'tournament-result-page',
      icon: 'podium',
    },
    { title: 'My Teams', url: 'my-teams', icon: 'people' },
    { title: 'Credits', url: 'buy-credits', icon: 'card' },
    { title: 'Subscriptions', url: 'subscription-list', icon: 'cash' },
    { title: 'Ranking', url: 'ranking', icon: 'analytics' },
    { title: 'Invitations', url: 'invitation-list', icon: 'add' },
    // { title: 'Logout', url: 'logout', icon: 'log-out' icon: 'settings' },
  ];
  constructor(
    private router: Router,
    private menu: MenuController,
    private authService: AuthService,
    private fcmService: FcmService

  ) {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }

  async ngOnInit() {
    this.fcmService.initPush();
    this.authService.userData$.subscribe((user) => {
      this.response = user;
    });
  }

  async openModal() {
    this.router.navigateByUrl('/home/profile');
    this.menu.close();
  }

  async logout() {
    console.log('logging out');
    await Preferences.remove({ key: 'token' });
    this.router.navigate(['/login']);
  }
}
