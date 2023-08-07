import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnonymoususerattributesPage } from './anonymoususerattributes.page';

const routes: Routes = [
  {
    path: '',
    component: AnonymoususerattributesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnonymoususerattributesPageRoutingModule {}
