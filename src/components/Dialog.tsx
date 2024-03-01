import { useState } from "react";
import getRandomColor from "../assets/colors";

type Props = {
    handleDialogClose: (value: boolean) => void;
    handleNoteUpdate: (content: Note) => void;
    note?: Note;
};

const backgroundColor = getRandomColor();

function Dialog({ note, handleDialogClose, handleNoteUpdate }: Props) {
    const [content, setContent] = useState(
        note || { title: "", content: "", bgColor: backgroundColor }
    );

    function ifClickedOutside(e: React.MouseEvent<HTMLDivElement>) {
        if (e.target === e.currentTarget) {
            handleNoteUpdate({
                ...content,
                bgColor: backgroundColor,
            });
            handleDialogClose(false);
        }
    }

    function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        handleNoteUpdate({
            ...content,
            bgColor: backgroundColor,
        });
        handleDialogClose(false);
    }

    return (
        <div
            className={`absolute inset-0 backdrop-blur-md backdrop-brightness-75 flex justify-center items-center z-10`}
            onClick={ifClickedOutside}
        >
            <form
                className={`flex flex-col gap-2 max-w-md w-full p-4 rounded-md shadow-md text-lg`}
                style={{ backgroundColor }}
                onSubmit={handleFormSubmit}
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
            </form>
        </div>
    );
}

export default Dialog;
