import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { MenuController } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { FcmService } from './services/fcm.service';


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
      icon: 'trophy',
    },
    { title: 'My Teams', url: 'my-teams', icon: 'people' },
    { title: 'Credits', url: 'buy-credits', icon: 'people' },
    { title: 'Subscriptions', url: 'subscription-list', icon: 'settings' },
    { title: 'Ranking', url: 'ranking', icon: 'settings' },
    // { title: 'Logout', url: 'logout', icon: 'log-out' },
  ];
  constructor(
    private router: Router,
    private menu: MenuController,
    private authService: AuthService,
        private fcmService: FcmService

  ) {}

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
