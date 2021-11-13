import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsAllComponent } from './patients/patients-all/patients-all.component';
import { PatientsFavoritesComponent } from './patients/patients-favorites/patients-favorites.component';

import { PatientsComponent } from './patients/patients.component';

const routes: Routes = [
  {
    path: '',
    component: PatientsComponent,
    data: {
      title: 'stms.menu.patients'
    },
    children: [
      {
        path: '',
        component: PatientsAllComponent,

      },
      {
        path: 'favorites',
        component: PatientsFavoritesComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule {
}
