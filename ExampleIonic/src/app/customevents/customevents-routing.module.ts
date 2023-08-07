import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomeventsPage } from './customevents.page';

const routes: Routes = [
  {
    path: '',
    component: CustomeventsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomeventsPageRoutingModule {}
