import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './List/lists/lists.component';
import { MemberListComponent } from './member/member-list/member-list.component';
import { MessagesComponent } from './message/messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'members', component: MemberListComponent, },
      { path: 'list', component: ListsComponent },
      { path: 'message', component: MessagesComponent },
      { path: '**', component: HomeComponent, pathMatch: 'full' }]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
