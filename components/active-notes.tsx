"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const mockNotes = [
  {
    id: "1",
    created: new Date(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    algorithm: "AES-256",
    isPasswordProtected: true,
    status: "Active",
  },
  // Add more mock notes as needed
];

export function ActiveNotes() {
  const [notes, setNotes] = useState(mockNotes);
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);

  const handleDestroyNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
    toast.success("Note destroyed successfully");
    setNoteToDelete(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Active Notes</h2>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Created</TableHead>
              <TableHead>Expires</TableHead>
              <TableHead>Algorithm</TableHead>
              <TableHead>Protected</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notes.map((note) => (
              <TableRow key={note.id}>
                <TableCell>
                  {format(note.created, "MMM d, yyyy HH:mm")}
                </TableCell>
                <TableCell>
                  {format(note.expiresAt, "MMM d, yyyy HH:mm")}
                </TableCell>
                <TableCell>{note.algorithm}</TableCell>
                <TableCell>
                  {note.isPasswordProtected ? "Yes" : "No"}
                </TableCell>
                <TableCell>{note.status}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setNoteToDelete(note.id)}
                  >
                    Destroy
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog
        open={!!noteToDelete}
        onOpenChange={() => setNoteToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Destroy Note</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to destroy this note? This action cannot be
              undone and the note will no longer be accessible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => noteToDelete && handleDestroyNote(noteToDelete)}
            >
              Destroy
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}