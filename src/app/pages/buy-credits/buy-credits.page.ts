import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreditService } from 'src/app/services/credit.service';
import { ToastService } from 'src/app/services/toast.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-buy-credits',
  templateUrl: './buy-credits.page.html',
  styleUrls: ['./buy-credits.page.scss'],
})
export class BuyCreditsPage implements OnInit {
  paymentAmount: any = 0;
  currency: string = 'USD';
  currencyIcon: string = '$';

  tournamentForm: FormGroup;

  validation_messages = {
    // start_date: [{ type: 'required', message: 'Start Date is required.' }],
    // fee: [{ type: 'required', message: 'Fee is required.' }],
    // game_id: [{ type: 'required', message: 'Game is required.' }],
    // platform_id: [{ type: 'required', message: 'Platform is required.' }],
  };

  constructor(
    private transactionService: TransactionService,
    private creditService: CreditService,
    private locationStrategy: LocationStrategy,
    private toastService: ToastService,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.tournamentForm = this.formBuilder.group({
      paymentAmount: ['0', [Validators.required]],
    });
  }

  public createTournament = async () => {
    if (!this.tournamentForm.valid) {
      console.log('Chuti kar mera puttar');
    } else {
      console.log(this.tournamentForm.value);

      let params = this.tournamentForm.value;
      let _this = this;
      _this.paymentAmount = params.paymentAmount;
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
                    full_name:
                      details.purchase_units[0].shipping.name.full_name,
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
                  };
                  console.log('request data: ', requestData);

                  await _this.transactionService
                    .createTransaction(requestData)
                    .subscribe(
                      async (data: any) => {
                        console.log(data);
                        var requestDataCredit = {
                          transaction_id: data.id,
                          amount: data.amount,
                          type: 'credit',
                        };
                        await _this.creditService
                          .createCredit(requestDataCredit)
                          .subscribe(
                            async (data: any) => {
                              console.log(data);
                              _this.locationStrategy.back();
                            },
                            (error) => {
                              console.log(error);
                            }
                          );
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
    }
  };
}
