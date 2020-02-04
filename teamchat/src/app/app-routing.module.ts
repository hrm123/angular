import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { SignonFormComponent } from './signon-form/signon-form.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';


const routes: Routes = [
  {path:'signup', component: SignupFormComponent},
  {path:'signon', component: SignonFormComponent},
  {path:'chat', component: ChatRoomComponent},
  {path:'', redirectTo: 'signon', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
