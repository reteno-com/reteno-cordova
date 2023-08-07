import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserattributesPageRoutingModule } from './userattributes-routing.module';

import { UserattributesPage } from './userattributes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserattributesPageRoutingModule
  ],
  declarations: [UserattributesPage]
})
export class UserattributesPageModule {}
