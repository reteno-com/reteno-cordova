import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {
  Address,
  User,
  UserAttributes,
  SetUserAttributesPayload,
  AwesomeCordovaPluginReteno,
} from '../../../../../awesome-cordova-plugin-reteno/dist/ngx';

@Component({
  selector: 'app-userattributes',
  templateUrl: './userattributes.page.html',
  styleUrls: ['./userattributes.page.scss'],
})
export class UserattributesPage implements OnInit {
  externalId = '';
  email = '';
  phone = '';
  firstName = '';
  lastName = '';
  language = '';
  region = '';
  timezone = '';
  town = '';
  address = '';
  postcode = '';

  constructor(
    private alertController: AlertController,
    private retenoPlugin: AwesomeCordovaPluginReteno
  ) {}

  ngOnInit() {}

  async sendAttributes() {
    if (this.externalId.trim().length <= 0) {
      const alert = await this.alertController.create({
        header: 'Invalid inputs',
        message: 'Please enter User External Id!',
        buttons: ['Ok'],
      });
      await alert.present();
      return;
    }
    const retenoAddress: Address = {
      region: this.region,
      town: this.town,
      address: this.address,
      postcode: this.postcode,
    };

    const userAttributes: UserAttributes = {
      phone: this.phone,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      languageCode: this.language,
      timeZone: this.timezone,
      address: retenoAddress,
    };

    const payload: SetUserAttributesPayload = {
      externalUserId: this.externalId,
      user: { userAttributes },
    };
    this.retenoPlugin.setUserAttributes(payload);
    this.clear();
  }

  clear() {
    this.externalId = '';
    this.email = '';
    this.phone = '';
    this.firstName = '';
    this.lastName = '';
    this.language = '';
    this.region = '';
    this.timezone = '';
    this.town = '';
    this.address = '';
    this.postcode = '';
  }
}
