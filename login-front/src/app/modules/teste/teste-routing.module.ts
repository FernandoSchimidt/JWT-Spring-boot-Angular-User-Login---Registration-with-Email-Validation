import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TesteComponent } from '../pages/teste/teste.component';

const routes: Routes = [
  {
    path: '',
    component: TesteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TesteRoutingModule {}