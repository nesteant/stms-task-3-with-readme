import { Patient } from '../../../shared/models/patient.model';

export interface PatientsState {
  patient: (Patient & { isFavorite?: boolean })[];
  favorite: string[];
  count?: number;
  undisplayedMatches?: boolean;
  moreUncountedMatches?: boolean;
}

export interface PatientsSuccessResponse {
  count: number;
  patient: Patient[];
  undisplayedMatches: boolean;
  moreUncountedMatches: boolean;
  showOnlyFavorites: boolean;
}

export interface PatientsFailedResponse {
  message: string;
}
