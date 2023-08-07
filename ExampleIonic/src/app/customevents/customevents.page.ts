import { Component, OnInit } from '@angular/core';
import {EventsService} from "../events.service";
import {
    AwesomeCordovaPluginReteno,
    CustomEventParameter,
    LogEvent
} from "../../../../awesome-cordova-plugin-reteno/dist/ngx";

@Component({
  selector: 'app-customevents',
  templateUrl: './customevents.page.html',
  styleUrls: ['./customevents.page.scss'],
})
export class CustomeventsPage implements OnInit {
  eventType='test_event_type';

  constructor(public eventService : EventsService,
              private retenoPlugin: AwesomeCordovaPluginReteno) { }

  ngOnInit() {
  }
  public showHideEventComp(value: boolean) {
    this.eventService.showHideParamForm = value;
  }

  sendEvents() {
    const dateValue = new Date().toISOString();
    const payload: LogEvent = {
        eventName: this.eventType,
        date: dateValue,
        parameters: this.eventService.eventParams,
        forcePush: false
    };
    this.retenoPlugin.logEvent(payload);
  }

  addParameters() {
    this.showHideEventComp(true);
  }
}
