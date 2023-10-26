import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AwesomeCordovaPluginReteno } from '../../../../awesome-cordova-plugin-reteno/dist/ngx';
import { AwesomeCordovaPluginFirebase } from '../../../../awesome-cordova-plugin-reteno-firebase/dist/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AwesomeCordovaPluginReteno,
    AwesomeCordovaPluginFirebase,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
