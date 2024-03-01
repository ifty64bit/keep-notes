import { createLazyFileRoute } from "@tanstack/react-router";
import Add from "../../assets/Add";
import { useState } from "react";
import { deleteNoteById, saveOrUpdateNote } from "../../utils/firebase";
import Dialog from "../../components/Dialog";
import { createPortal } from "react-dom";
import NoteCard from "../../components/NoteCard";
import NoteContainer from "../../components/NoteContainer";
import useFetchNotes from "../../hooks/useFetchNotes";

export const Route = createLazyFileRoute("/_layout-private/dashboard")({
    component: Dashboard,
});

function Dashboard() {
    const { notes, isLoading, invalidate } = useFetchNotes();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState<Note | undefined>(
        undefined
    );

    async function handleNoteUpdate(content: Note) {
        //If empty note, return
        if (content.title === "" && content.content === "") return;

        //If note is same as selected note, return
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
        invalidate();
    }

    return (
        <section>
            <div className="p-2 sm:p-6">
                <NoteContainer>
                    {isLoading ? (
                        <div className="flex items-center mx-auto h-[200px] ">
                            <h3 className="text-xl font-semibold opacity-50">
                                Loading Notes...
                            </h3>
                        </div>
                    ) : notes.length === 0 ? (
                        <div className="flex items-center mx-auto h-[200px] ">
                            <h3 className="text-xl font-semibold opacity-50">
                                Click on the add button to create a new note.
                            </h3>
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
                                handleDelete={() => {
                                    deleteNoteById(note.id as string);
                                    invalidate();
                                }}
                            />
                        ))
                    )}
                </NoteContainer>
            </div>
            {isDialogOpen &&
                createPortal(
                    <Dialog
                        note={selectedNote}
                        handleDialogClose={setIsDialogOpen}
                        handleNoteUpdate={handleNoteUpdate}
                    />,
                    document.getElementById("portal") as HTMLElement
                )}
            <Add
                className="absolute right-4 bottom-4 hover:bg-slate-200 transition-colors rounded-full"
                onClick={() => setIsDialogOpen(true)}
            />
        </section>
    );
}
