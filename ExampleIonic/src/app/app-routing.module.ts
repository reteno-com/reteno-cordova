import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'anonymoususerattributes',
    loadChildren: () => import('./anonymoususerattributes/anonymoususerattributes.module').then( m => m.AnonymoususerattributesPageModule)
  },
  {
    path: 'customevents',
    loadChildren: () => import('./customevents/customevents.module').then( m => m.CustomeventsPageModule)
  },
  {
    path: 'userattributes',
    loadChildren: () => import('./userattributes/userattributes.module').then( m => m.UserattributesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
