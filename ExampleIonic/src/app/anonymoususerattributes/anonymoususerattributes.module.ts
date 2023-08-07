import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnonymoususerattributesPageRoutingModule } from './anonymoususerattributes-routing.module';

import { AnonymoususerattributesPage } from './anonymoususerattributes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnonymoususerattributesPageRoutingModule
  ],
  declarations: [AnonymoususerattributesPage]
})
export class AnonymoususerattributesPageModule {}
