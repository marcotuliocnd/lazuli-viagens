import { AuthGuard } from './services/auth.guard';
import { GuestGuard } from './services/guest.guard';
import { AuthInterceptor } from './services/auth.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule  } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPhoneMaskBrModule } from 'ngx-phone-mask-br';
import { NgxCpfCnpjModule } from  'ngx-cpf-cnpj';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(maskConfig),
    ToastrModule.forRoot(),
    NgxPhoneMaskBrModule,
    NgxCpfCnpjModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    GuestGuard,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
