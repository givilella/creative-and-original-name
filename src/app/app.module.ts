import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsageComponent } from './components/usage/usage.component';
import { FormsModule } from '@angular/forms';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ChildrenComponent } from './components/children/children.component';
import { HttpInterceptorProviders } from './interceptors';
import { NotificationsService } from './services/notifications.service';
import { AppInitializerProviders } from './services';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    UsageComponent,
    NotificationsComponent,
    NavbarComponent,
    ChildrenComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [
    HttpInterceptorProviders,
    AppInitializerProviders,
    NotificationsService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
