import { NextResponse } from 'next/server';
import { getCandidates, addCandidate, updateCandidate, deleteCandidate } from '@/lib/storage';
import { CreateCandidateDto, UpdateCandidateDto } from '@/types/candidate';

// GET all candidates
export async function GET() {
  try {
    const candidates = getCandidates();
    return NextResponse.json(candidates);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch candidates' },
      { status: 500 }
    );
  }
}

// POST - Add a new candidate
export async function POST(request: Request) {
  try {
    const body: CreateCandidateDto = await request.json();
    
    // Validation
    if (!body.name || !body.email || !body.role || !body.phone || !body.status) {
      return NextResponse.json(
        { error: 'Name, email, phone, role, and status are required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const newCandidate = addCandidate(body);
    return NextResponse.json(newCandidate, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create candidate' },
      { status: 500 }
    );
  }
}

// PUT - Update an existing candidate
export async function PUT(request: Request) {
  try {
    const body: UpdateCandidateDto = await request.json();
    
    // Validation
    if (!body.id) {
      return NextResponse.json(
        { error: 'Candidate ID is required' },
        { status: 400 }
      );
    }

    if (!body.name || !body.email || !body.role || !body.phone || !body.status) {
      return NextResponse.json(
        { error: 'Name, email, phone, role, and status are required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const { id, ...updates } = body;
    const updatedCandidate = updateCandidate(id, updates);
    
    if (!updatedCandidate) {
      return NextResponse.json(
        { error: 'Candidate not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedCandidate);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update candidate' },
      { status: 500 }
    );
  }
}

// DELETE - Remove a candidate
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Candidate ID is required' },
        { status: 400 }
      );
    }

    const deleted = deleteCandidate(id);
    
    if (!deleted) {
      return NextResponse.json(
        { error: 'Candidate not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Candidate deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete candidate' },
      { status: 500 }
    );
  }
}
