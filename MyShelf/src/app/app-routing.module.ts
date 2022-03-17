import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CollectionCreateComponent } from './collection-create/collection-create.component';
import { CollectionListComponent } from './collection-list/collection-list.component';

const routes: Routes = [
  { path: '', component: CollectionListComponent },
  { path: 'create', component: CollectionCreateComponent },
  { path: 'user/signup', component: SignupComponent },
  { path: 'user/login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
