import { useState } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import getRandomColor from "../assets/colors";

type Props = {
    handleDialogClose: () => void;
    handleNoteUpdate: (content: Note) => void;
    note?: Note;
};

const backgroundColor = getRandomColor();

const initalNote = {
    id: "",
    title: "",
    content: "",
    bgColor: backgroundColor,
};

function Dialog({ note, handleDialogClose, handleNoteUpdate }: Props) {
    const [content, setContent] = useState(note || initalNote);

    function close() {
        handleNoteUpdate({
            ...content,
            bgColor: backgroundColor,
        });
        handleDialogClose();
        setContent(initalNote);
    }

    function ifClickedOutside(e: React.MouseEvent<HTMLDivElement>) {
        if (e.target === e.currentTarget) {
            close();
        }
    }

    function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        close();
    }

    return (
        <div
            className={`absolute inset-0 backdrop-blur-md backdrop-brightness-75 flex justify-center items-center z-10`}
            onClick={ifClickedOutside}
        >
            <LazyMotion features={domAnimation}>
                <m.form
                    className={`flex flex-col gap-2 dark:text-black  max-w-md w-full p-4 rounded-md shadow-md text-lg`}
                    key={"dialog"}
                    style={{ backgroundColor }}
                    onSubmit={handleFormSubmit}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <input
                        name="title"
                        type="text"
                        placeholder="Title"
                        className="shadow-md focus:outline-none p-1 rounded-md bg-transparent "
                        value={content.title}
                        onChange={(e) =>
                            setContent({ ...content, title: e.target.value })
                        }
                    />

                    <textarea
                        placeholder="Note Content"
                        name="content"
                        className="shadow-md focus:outline-none p-1 rounded-md min-h-60 bg-transparent"
                        value={content.content}
                        onChange={(e) =>
                            setContent({ ...content, content: e.target.value })
                        }
                    />
                    <div className="flex justify-end">
                        <button
                            className="text-sm hover:bg-slate-300 hover:dark:text-white hover:dark:bg-slate-900 transition-colors rounded p-1"
                            onClick={close}
                        >
                            Close
                        </button>
                    </div>
                </m.form>
            </LazyMotion>
        </div>
    );
}

export default Dialog;
