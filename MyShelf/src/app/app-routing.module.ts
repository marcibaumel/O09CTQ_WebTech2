import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CollectionCreateComponent } from './collection-create/collection-create.component';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { CollectionSearchComponent } from './collection-search/collection-search.component';

const routes: Routes = [
  { path: '', component: CollectionListComponent, canActivate: [AuthGuard] },
  { path: 'create', component: CollectionCreateComponent, canActivate: [AuthGuard] },
  { path: 'search', component: CollectionSearchComponent, canActivate: [AuthGuard] },
  { path: 'user/signup', component: SignupComponent },
  { path: 'user/login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
