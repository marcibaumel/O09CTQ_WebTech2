import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionCreateComponent } from './collection-create/collection-create.component';
import { CollectionListComponent } from './collection-list/collection-list.component';


const routes: Routes = [
  { path: '', component: CollectionListComponent },
  { path: 'create', component: CollectionCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
