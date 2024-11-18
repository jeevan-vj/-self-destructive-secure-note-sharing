import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

interface Note {
  content: string;
  createdAt: number;
  expiresIn: number;
  isPasswordProtected: boolean;
  algorithm: string;
  recipientEmail?: string;
  accessLog: {
    timestamp: number;
    ipAddress: string;
    userAgent: string;
  }[];
}

// In-memory store for development
const notes = new Map<string, Note>();

// Configure the route as dynamic
export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    const id = crypto.randomBytes(16).toString('hex');
    const note: Note = {
      content: body.content,
      createdAt: Date.now(),
      expiresIn: (body.expiresIn || 72) * 60 * 60 * 1000,
      isPasswordProtected: !!body.isPasswordProtected,
      algorithm: body.algorithm || 'AES-256',
      recipientEmail: body.recipientEmail,
      accessLog: [],
    };

    notes.set(id, note);

    return NextResponse.json({ id }, { status: 201 });
  } catch (error) {
    console.error('Note creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create note' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const id = request.url.split('/').pop()?.split('?')[0];
    
    if (!id) {
      return NextResponse.json(
        { error: 'Note ID is required' },
        { status: 400 }
      );
    }

    const note = notes.get(id);
    
    if (!note) {
      return NextResponse.json(
        { error: 'Note not found or already accessed' },
        { status: 404 }
      );
    }

    if (Date.now() - note.createdAt > note.expiresIn) {
      notes.delete(id);
      return NextResponse.json(
        { error: 'Note has expired' },
        { status: 410 }
      );
    }

    const userAgent = request.headers.get('user-agent') || 'Unknown';
    const ipAddress = request.headers.get('x-forwarded-for') || 'Unknown';

    note.accessLog.push({
      timestamp: Date.now(),
      ipAddress,
      userAgent,
    });

    const response = {
      content: note.content,
      isPasswordProtected: note.isPasswordProtected,
      algorithm: note.algorithm,
      accessLog: note.accessLog,
    };

    notes.delete(id);
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Note retrieval error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve note' },
      { status: 500 }
    );
  }
}