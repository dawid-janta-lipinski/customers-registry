/* eslint-disable prettier/prettier */
import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';

@NgModule({
  declarations: [HeaderComponent, SpinnerComponent],
  imports: [
    SharedModule,
    RouterModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
  ],
  exports: [HeaderComponent, SpinnerComponent],
})
export class CoreModule {}
