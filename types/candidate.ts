export type CandidateStatus = 'Applied' | 'Interviewing' | 'Offered' | 'Hired' | 'Rejected';

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: CandidateStatus;
  dateAdded: string;
}

export interface CreateCandidateDto {
  name: string;
  email: string;
  phone: string;
  role: string;
  status: CandidateStatus;
}

export interface UpdateCandidateDto extends CreateCandidateDto {
  id: string;
}
