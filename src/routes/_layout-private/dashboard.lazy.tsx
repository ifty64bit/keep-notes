import { createLazyFileRoute } from "@tanstack/react-router";
import Add from "../../assets/Add";
import { useState } from "react";
import { deleteNoteById, saveOrUpdateNote } from "../../utils/firebase";
import Dialog from "../../components/Dialog";
import { createPortal } from "react-dom";
import NoteCard from "../../components/NoteCard";
import NoteContainer from "../../components/NoteContainer";
import useFetchNotes from "../../hooks/useFetchNotes";
import { toast } from "react-toastify";

export const Route = createLazyFileRoute("/_layout-private/dashboard")({
    component: Dashboard,
});

function Dashboard() {
    const { notes, isLoading } = useFetchNotes();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState<Note | undefined>(
        undefined,
    );

    function handleDialogClose() {
        setIsDialogOpen(false);
        setSelectedNote(undefined);
    }

    function handleDeleteNote(note: Note) {
        deleteNoteById(note.id as string);
        toast.success("Note deleted successfully");
    }

    async function handleNoteUpdate(content: Note) {
        if (content.title === "" && content.content === "") return;

        if (
            content.title === selectedNote?.title &&
            content.content === selectedNote?.content
        )
            return;

        await saveOrUpdateNote({
            id: selectedNote?.id,
            title: content.title,
            content: content.content,
            bgColor: content.bgColor,
        });
        toast.success(
            content.id
                ? "Note updated successfully"
                : "Note added successfully",
        );
    }

    return (
        <section className="relative">
            <div className="p-4 sm:p-6 lg:p-8">
                <NoteContainer>
                    {isLoading ? (
                        <div className="col-span-full flex flex-col items-center justify-center py-20">
                            <div className="w-12 h-12 rounded-full border-4 border-primary-200 border-t-primary-600 animate-spin" />
                            <p className="mt-4 text-surface-500 font-medium">
                                Loading your notes...
                            </p>
                        </div>
                    ) : notes.length === 0 ? (
                        <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-20 h-20 rounded-2xl bg-primary-100 flex items-center justify-center mb-4">
                                <svg
                                    className="w-10 h-10 text-primary-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-surface-800 mb-2">
                                No notes yet
                            </h3>
                            <p className="text-surface-500 max-w-xs">
                                Click the{" "}
                                <span className="text-primary-600 font-medium">
                                    +
                                </span>{" "}
                                button to create your first note
                            </p>
                        </div>
                    ) : (
                        notes.map((note) => (
                            <NoteCard
                                key={note.id}
                                {...note}
                                onClick={() => {
                                    setSelectedNote(note);
                                    setIsDialogOpen(true);
                                }}
                                handleDelete={() => handleDeleteNote(note)}
                            />
                        ))
                    )}
                </NoteContainer>
            </div>

            {isDialogOpen &&
                createPortal(
                    <Dialog
                        note={selectedNote}
                        handleDialogClose={handleDialogClose}
                        handleNoteUpdate={handleNoteUpdate}
                    />,
                    document.getElementById("portal") as HTMLElement,
                )}

            {/* Floating Action Button */}
            <button
                className="fab"
                onClick={() => setIsDialogOpen(true)}
                aria-label="Add new note"
            >
                <Add className="w-6 h-6" />
            </button>
        </section>
    );
}
