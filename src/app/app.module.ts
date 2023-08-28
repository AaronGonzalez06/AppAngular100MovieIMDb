import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { StartComponent } from './components/start/start.component';
import { routing, appRoutingProviders } from './app.routing';
import { SeenComponent } from './components/seen/seen.component';
import { PendingComponent } from './components/pending/pending.component';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    SeenComponent,
    PendingComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
