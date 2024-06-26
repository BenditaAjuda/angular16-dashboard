import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContaRoutingModule } from './conta-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmaEmailComponent } from './confirma-email/confirma-email.component';
import { EnviaEmailComponent } from './envia-email/envia-email.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    ConfirmaEmailComponent,
    EnviaEmailComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    ContaRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ContaModule { }
