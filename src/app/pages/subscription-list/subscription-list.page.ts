import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { SubscriptionServiceService } from 'src/app/services/subscription-service.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.page.html',
  styleUrls: ['./subscription-list.page.scss'],
})
export class SubscriptionListPage implements OnInit {
  paymentAmount: any = 0;
  currency: string = 'USD';
  currencyIcon: string = '$';
  subs: [];

  constructor(
    private transactionService: TransactionService,
    private subscriptionService: SubscriptionServiceService,
    private locationStrategy: LocationStrategy,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.listSubs();
  }

  async listSubs(params?) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      // duration: 3000,
    });

    loading.present();

    await this.subscriptionService.getSubs().subscribe(
      (data: any) => {
        console.log(data);
        this.subs = data;
        loading.dismiss();
      },
      (error) => {
        console.log(error);
        loading.dismiss();
      }
    );
  }

  public createCredit = async (amount, sub_id) => {
    // if (!this.tournamentForm.valid) {
    //   console.log('Chuti kar mera puttar');
    // } else {
    console.log(amount);

    // let params = this.tournamentForm.value;
    let _this = this;
    _this.paymentAmount = amount;
    console.log('form params', _this.paymentAmount);
    setTimeout(() => {
      // Render the PayPal button into #paypal-button-container
      <any>window['paypal']
        .Buttons({
          // Set up the transaction
          createOrder: function (data, actions) {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: _this.paymentAmount,
                  },
                },
              ],
            });
          },

          // Finalize the transaction
          onApprove: function (data, actions) {
            return actions.order
              .capture()
              .then(async function (details) {
                // Show a success message to the buyer
                console.log(details);
                alert(
                  'Transaction completed by ' +
                    details.payer.name.given_name +
                    '!'
                );
                var requestData = {
                  amount: parseFloat(details.purchase_units[0].amount.value),
                  currency: details.purchase_units[0].amount.currency_code,
                  transaction_id: details.id,
                  full_name: details.purchase_units[0].shipping.name.full_name,
                  address_line_1:
                    details.purchase_units[0].shipping.address.address_line_1,
                  address_line_2:
                    details.purchase_units[0].shipping.address.address_line_2,
                  admin_area_2:
                    details.purchase_units[0].shipping.address.admin_area_2,
                  postal_code:
                    details.purchase_units[0].shipping.address.postal_code,
                  country_code:
                    details.purchase_units[0].shipping.address.country_code,
                  payment_json: details,
                  sub_id: sub_id,
                };
                console.log('request data: ', requestData);

                await _this.subscriptionService
                  .createSub(requestData)
                  .subscribe(
                    async (data: any) => {
                      console.log(data);
                      _this.locationStrategy.back();
                    },
                    (error) => {
                      console.log(error);
                    }
                  );
              })
              .catch((err) => {
                console.log(err);
              });
          },
        })
        .render('#paypal-button-container');
    }, 500);
    // }
  };
}
