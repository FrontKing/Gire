import { UserService } from './services/user.service';
import { NgModule, Type } from '@angular/core';
import { BrowserModule, Title }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CovalentCoreModule, CovalentSearchModule } from '@covalent/core';
import { CovalentHttpModule, IHttpInterceptor } from '@covalent/http';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './user/login/login.component';
import { MdDialogModule } from '@angular/material';
import { appRoutes, appRoutingProviders } from './app.routes';

import { RequestInterceptor } from '../config/interceptors/request.interceptor';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { RegisterComponent } from './user/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotComponent } from './user/forgot/forgot.component';
import { ProfileComponent } from './profile/profile.component';
import { Dir } from '@angular/material/core/rtl/dir';
import { SettingsComponent } from './settings/settings.component';
import { CategoryComponent } from './category/category.component';
import { CategoryItemComponent } from './category/category-item/category-item.component';
import { HttpClientModule } from '@angular/common/http';

const httpInterceptorProviders: Type<any>[] = [
  RequestInterceptor,
];

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    RegisterComponent,
    ForgotComponent,
    ProfileComponent,
    SettingsComponent,
    CategoryComponent,
    CategoryItemComponent
  ], // directives, components, and pipes owned by this NgModule
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CovalentCoreModule,
    CovalentHttpModule.forRoot({
      interceptors: [{
        interceptor: RequestInterceptor, paths: ['**'],
      }],
    }),
    appRoutes,
    NgxChartsModule,
    ReactiveFormsModule,
    // FormsModule,
    CovalentSearchModule,
    MdDialogModule,
    HttpClientModule
  ], // modules needed to run this module
  providers: [
    appRoutingProviders,
    httpInterceptorProviders,
    Title,
    Dir,
    UserService
  ], // additional providers needed for this module
  entryComponents: [ CategoryComponent ],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
