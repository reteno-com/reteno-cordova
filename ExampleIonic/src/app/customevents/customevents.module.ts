import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomeventsPageRoutingModule } from './customevents-routing.module';

import { CustomeventsPage } from './customevents.page';
import {CustomEventFormComponent} from "./custom-event-form/custom-event-form.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomeventsPageRoutingModule
  ],
    declarations: [CustomeventsPage, CustomEventFormComponent]
})
export class CustomeventsPageModule {}
