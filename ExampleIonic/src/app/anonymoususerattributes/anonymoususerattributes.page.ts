import { Component, OnInit } from '@angular/core';
import {Address,UserAttributes, AwesomeCordovaPluginReteno} from "../../../../awesome-cordova-plugin-reteno/dist/ngx";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-anonymoususerattributes',
  templateUrl: './anonymoususerattributes.page.html',
  styleUrls: ['./anonymoususerattributes.page.scss'],
})
export class AnonymoususerattributesPage implements OnInit {

  firstName = '';
  lastName = '';
  language = '';
  region = '';
  timezone = '';
  town = '';
  address = '';
  postcode = '';

  constructor(private alertController: AlertController,
              private retenoPlugin: AwesomeCordovaPluginReteno) {

  }

  ngOnInit() {
  }

  async sendAttributes() {
    const retenoAddress : Address = {
      region : this.region,
      town : this.town,
      address : this.address,
      postcode : this.postcode
    };

    const userAttributes : UserAttributes = {
      firstName : this.firstName,
      lastName : this.lastName,
      languageCode : this.language,
      timeZone : this.timezone,
      address : retenoAddress
    };

    const payload =  {
      userAttributes
    };
    this.retenoPlugin.setAnonymousUserAttributes(payload);
    this.clear();
  }

  clear() {
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
