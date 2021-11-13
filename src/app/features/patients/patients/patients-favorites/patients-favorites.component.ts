import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { patientsFetch, PatientsState } from '../../ngrx';
import { PatientsTableComponent } from '../patients-table.component';

@Component({
  templateUrl: './patients-favorites.component.html',
  styleUrls: ['./patients-favorites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientsFavoritesComponent extends PatientsTableComponent implements OnInit {
  constructor(protected store: Store<PatientsState>) {
    super(true, store);
  }

  ngOnInit(): void {
    this.store.dispatch(patientsFetch({
      onlyFavorites: true
    }));
  }

}
