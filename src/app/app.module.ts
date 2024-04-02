import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GuematrieModule } from './guematrie/guematrie.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,HttpClientModule, AppRoutingModule, GuematrieModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
