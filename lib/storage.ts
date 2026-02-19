import { Candidate } from '@/types/candidate';

// In-memory storage for candidates (simulating a database)
let candidates: Candidate[] = [
  {
    id: '1',
    name: 'Krish Kumar',
    email: 'krish@example.com',
    phone: '+1 (555) 123-4567',
    role: 'Frontend Developer',
    status: 'Hired',
    dateAdded: new Date('2026-01-15').toISOString(),
  },
  {
    id: '2',
    name: 'Kush',
    email: 'kush@example.com',
    phone: '+1 (555) 234-5678',
    role: 'Backend Developer',
    status: 'Interviewing',
    dateAdded: new Date('2026-02-01').toISOString(),
  },
  {
    id: '3',
    name: 'Naman',
    email: 'naman@example.com',
    phone: '+1 (555) 345-6789',
    role: 'Full Stack Developer',
    status: 'Applied',
    dateAdded: new Date('2026-02-10').toISOString(),
  },
];

export const getCandidates = (): Candidate[] => {
  return candidates;
};

export const addCandidate = (candidate: Omit<Candidate, 'id' | 'dateAdded'>): Candidate => {
  const newCandidate: Candidate = {
    ...candidate,
    id: Date.now().toString(),
    dateAdded: new Date().toISOString(),
  };
  candidates.push(newCandidate);
  return newCandidate;
};

export const updateCandidate = (id: string, updates: Omit<Candidate, 'id' | 'dateAdded'>): Candidate | null => {
  const index = candidates.findIndex((candidate) => candidate.id === id);
  if (index === -1) {
    return null;
  }
  
  candidates[index] = {
    ...candidates[index],
    ...updates,
  };
  
  return candidates[index];
};

export const deleteCandidate = (id: string): boolean => {
  const initialLength = candidates.length;
  candidates = candidates.filter((candidate) => candidate.id !== id);
  return candidates.length < initialLength;
};
