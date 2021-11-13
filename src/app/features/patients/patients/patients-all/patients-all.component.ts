import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { patientsClear, PatientsState } from '../../ngrx';
import { PatientsTableComponent } from '../patients-table.component';

@Component({
  templateUrl: './patients-all.component.html',
  styleUrls: ['./patients-all.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientsAllComponent extends PatientsTableComponent implements OnInit {
  constructor(protected store: Store<PatientsState>) {
    super(false, store);
  }

  ngOnInit(): void {
    this.store.dispatch(patientsClear({clearFavorites: false}));
  }
}
