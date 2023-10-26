import { Injectable } from '@angular/core';
import { CustomEventParameter } from '../../../../awesome-cordova-plugin-reteno/dist/ngx';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  eventParams: CustomEventParameter[] = [];
  public showHideParamForm: boolean = false;
  public customParams = '';
  constructor() {}

  public addParam(param: CustomEventParameter) {
    this.eventParams.push(param);
    this.customParams = JSON.stringify(this.eventParams);
  }

  public getParams() {
    return this.eventParams;
  }
}
