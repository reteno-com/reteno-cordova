import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../events.service';
import { AlertController } from '@ionic/angular';
import { CustomEventParameter } from '../../../../../../awesome-cordova-plugin-reteno/dist/ngx';

@Component({
  selector: 'app-custom-event-form',
  templateUrl: './custom-event-form.component.html',
  styleUrls: ['./custom-event-form.component.scss'],
})
export class CustomEventFormComponent implements OnInit {
  customParameter: CustomEventParameter = {
    name: '',
    value: '',
  };

  constructor(
    private eventService: EventsService,
    private alertController: AlertController
  ) {}

  ngOnInit() {}
  async createParameters() {
    if (this.customParameter.name.trim().length <= 0) {
      const alert = await this.alertController.create({
        header: 'Invalid inputs',
        message: 'Please enter Name!',
        buttons: ['Ok'],
      });
      await alert.present();
      return;
    }
    this.eventService.addParam(this.customParameter);
    this.eventService.showHideParamForm = false;
  }
}
