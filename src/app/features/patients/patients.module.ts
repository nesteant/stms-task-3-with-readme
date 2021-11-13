import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../../shared/shared.module';
import { PatientsEffects, patientsReducer } from './ngrx';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsAllComponent } from './patients/patients-all/patients-all.component';
import { PatientsFavoritesComponent } from './patients/patients-favorites/patients-favorites.component';
import { PatientsComponent } from './patients/patients.component';

@NgModule({
  declarations: [PatientsComponent, PatientsAllComponent, PatientsFavoritesComponent],
  imports: [
    CommonModule,
    SharedModule,
    PatientsRoutingModule,
    StoreModule.forFeature('patients', patientsReducer),
    EffectsModule.forFeature([PatientsEffects])
  ],
  providers: []
})
export class PatientsModule {
}
