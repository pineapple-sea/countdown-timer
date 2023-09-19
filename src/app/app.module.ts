import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AkitaNgDevtools.forRoot({
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
