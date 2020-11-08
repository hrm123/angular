import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProfileHostDirective } from './profile-host.directive';
import { ProfileComponent } from './profile/profile.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent, ProfileHostDirective, ProfileComponent],
  imports: [BrowserModule, AppRoutingModule],
  bootstrap: [AppComponent]})
export class AppModule {}