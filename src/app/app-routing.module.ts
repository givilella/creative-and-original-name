import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildrenComponent } from './components/children/children.component';
import { UsageComponent } from './components/usage/usage.component';

const routes: Routes = [
  {
    path: '',
    component: UsageComponent,
  },
  {
    path: 'children/:id',
    component: ChildrenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
