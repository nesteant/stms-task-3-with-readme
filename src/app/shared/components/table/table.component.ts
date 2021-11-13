import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, Subject, takeUntil } from 'rxjs';

export type LabelFunction = <T = any>(v: T) => string;
export type ColumnDef = {
  name: string;
  label: string;
  dataAccessor?: LabelFunction;
};

@Component({
  selector: 'st-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit, OnDestroy {

  @Input()
  entityId = 'identifier';

  @Input()
  data: any;

  @Input()
  displayFavorite: boolean;

  @Output()
  toggleFavorites = new EventEmitter<string>();
  @Output()
  search = new EventEmitter<string>();

  @Input()
  columns: ColumnDef[] = [];

  get displayedColumns() {
    return ['favorite', ...this.columns.map(col => col.name)];
  };

  destroy$ = new Subject<void>();
  searchFormControl = new FormControl('');

  ngOnInit() {
    this.searchFormControl.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(300)
      )
      .subscribe(v => this.search.next(v));
  }

  toggleFavorite(id: string) {
    this.toggleFavorites.next(id);
  }

  trackByOrder(index: number, order: any) {
    return order[this.entityId];
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
