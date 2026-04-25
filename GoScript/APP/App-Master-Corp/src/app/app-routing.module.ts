import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IdeComponent } from './ide/ide.component';

const routes: Routes = [
  {path: '', redirectTo: 'ide', pathMatch: 'full'},
  {path: 'ide', component: IdeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
