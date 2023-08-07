import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserattributesPage } from './userattributes.page';

const routes: Routes = [
  {
    path: '',
    component: UserattributesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserattributesPageRoutingModule {}
