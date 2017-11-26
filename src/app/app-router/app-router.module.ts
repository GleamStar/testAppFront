import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full'},
  { path: 'welcome', loadChildren: 'app/welcome/welcome.module#WelcomeModule'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [],
  providers : [],
  exports: [RouterModule]
})
export class AppRouterModule { }