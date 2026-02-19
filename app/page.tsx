'use client';

import { useState, useEffect } from 'react';
import { Candidate, CreateCandidateDto, UpdateCandidateDto } from '@/types/candidate';
import CandidateForm from '@/components/CandidateForm';
import CandidateList from '@/components/CandidateList';
import { Users } from 'lucide-react';

export default function Home() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(null);

  // Fetch candidates on mount
  useEffect(() => {
    fetchCandidates();
  }, []);

  // Auto-dismiss success messages
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const fetchCandidates = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('/api/candidates');

      if (!response.ok) {
        throw new Error('Failed to fetch candidates');
      }

      const data = await response.json();
      setCandidates(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddOrUpdateCandidate = async (candidateData: CreateCandidateDto | UpdateCandidateDto) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const isEditing = 'id' in candidateData;
      const url = '/api/candidates';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(candidateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to ${isEditing ? 'update' : 'add'} candidate`);
      }

      const resultCandidate = await response.json();

      if (isEditing) {
        setCandidates((prev) =>
          prev.map((candidate) =>
            candidate.id === resultCandidate.id ? resultCandidate : candidate
          )
        );
        setSuccess('Candidate updated successfully!');
        setEditingCandidate(null);
      } else {
        setCandidates((prev) => [...prev, resultCandidate]);
        setSuccess('Candidate added successfully!');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save candidate');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditCandidate = (candidate: Candidate) => {
    setEditingCandidate(candidate);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingCandidate(null);
  };

  const handleDeleteCandidate = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this candidate?')) {
      return;
    }

    try {
      setIsDeleting(id);
      setError(null);

      const response = await fetch(`/api/candidates?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete candidate');
      }

      setCandidates((prev) => prev.filter((candidate) => candidate.id !== id));
      setSuccess('Candidate deleted successfully!');
      
      // Clear editing state if deleting the candidate being edited
      if (editingCandidate && editingCandidate.id === id) {
        setEditingCandidate(null);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to delete candidate'
      );
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Users className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Candidate Management System
          </h1>
          <p className="text-gray-600">
            Manage your candidate database with ease
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm font-medium">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 text-sm font-medium">{success}</p>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {editingCandidate ? 'Edit Candidate' : 'Add New Candidate'}
          </h2>
          <CandidateForm
            onSubmit={handleAddOrUpdateCandidate}
            isSubmitting={isSubmitting}
            editingCandidate={editingCandidate}
            onCancelEdit={handleCancelEdit}
          />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Candidates List
            </h2>
            <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              {candidates.length} {candidates.length === 1 ? 'candidate' : 'candidates'}
            </span>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading candidates...</p>
            </div>
          ) : (
            <CandidateList
              candidates={candidates}
              onDelete={handleDeleteCandidate}
              onEdit={handleEditCandidate}
              isDeleting={isDeleting}
            />
          )}
        </div>
      </div>
    </div>
  );
}
