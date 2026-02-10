import { useState, useRef, useEffect } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";

type Props = {
    handleDialogClose: () => void;
    handleNoteUpdate: (content: Note) => void;
    note?: Note;
};

// Modern pastel color options
const colorOptions = [
    { name: "Pink", value: "oklch(0.92 0.05 350)" },
    { name: "Blue", value: "oklch(0.92 0.05 250)" },
    { name: "Yellow", value: "oklch(0.95 0.06 90)" },
    { name: "Mint", value: "oklch(0.93 0.05 160)" },
    { name: "Lavender", value: "oklch(0.91 0.06 290)" },
    { name: "Peach", value: "oklch(0.93 0.06 50)" },
];

function Dialog({ note, handleDialogClose, handleNoteUpdate }: Props) {
    const [content, setContent] = useState<Note>({
        id: note?.id || "",
        title: note?.title || "",
        content: note?.content || "",
        bgColor: note?.bgColor || colorOptions[0].value,
    });
    const [showColorPicker, setShowColorPicker] = useState(false);
    const titleRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Focus title on mount
    useEffect(() => {
        setTimeout(() => titleRef.current?.focus(), 100);
    }, []);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height =
                textareaRef.current.scrollHeight + "px";
        }
    }, [content.content]);

    function handleSave() {
        handleNoteUpdate(content);
        handleDialogClose();
    }

    function handleDiscard() {
        handleDialogClose();
    }

    function ifClickedOutside(e: React.MouseEvent<HTMLDivElement>) {
        if (e.target === e.currentTarget) {
            handleSave();
        }
    }

    function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        handleSave();
    }

    const isEditing = !!note?.id;
    const hasChanges =
        content.title !== (note?.title || "") ||
        content.content !== (note?.content || "");
    const isEmpty = !content.title.trim() && !content.content.trim();

    return (
        <div className="modal-backdrop" onClick={ifClickedOutside}>
            <LazyMotion features={domAnimation}>
                <m.form
                    className="w-full max-w-lg mx-4 rounded-2xl shadow-2xl overflow-hidden"
                    onSubmit={handleFormSubmit}
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                >
                    {/* Main content area */}
                    <div
                        className="p-5 transition-colors duration-300"
                        style={{ backgroundColor: content.bgColor }}
                    >
                        {/* Title input */}
                        <input
                            ref={titleRef}
                            name="title"
                            type="text"
                            placeholder="Title"
                            className="w-full text-xl font-bold bg-transparent border-none outline-none placeholder:text-surface-600/50 text-surface-900 mb-3"
                            value={content.title}
                            onChange={(e) =>
                                setContent({
                                    ...content,
                                    title: e.target.value,
                                })
                            }
                        />

                        {/* Content textarea */}
                        <textarea
                            ref={textareaRef}
                            placeholder="Take a note..."
                            name="content"
                            rows={4}
                            className="w-full min-h-[120px] max-h-[400px] bg-transparent border-none outline-none resize-none placeholder:text-surface-600/40 text-surface-800 leading-relaxed"
                            value={content.content}
                            onChange={(e) =>
                                setContent({
                                    ...content,
                                    content: e.target.value,
                                })
                            }
                        />
                    </div>

                    {/* Toolbar */}
                    <div
                        className="px-4 py-3 flex items-center justify-between border-t transition-colors duration-300"
                        style={{
                            backgroundColor: content.bgColor,
                            borderColor: "rgba(0,0,0,0.08)",
                        }}
                    >
                        {/* Left side - Color picker */}
                        <div className="relative">
                            <button
                                type="button"
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-900/10 hover:bg-surface-900/15 transition-colors text-sm font-medium text-surface-700"
                                onClick={() =>
                                    setShowColorPicker(!showColorPicker)
                                }
                            >
                                <span
                                    className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                                    style={{ backgroundColor: content.bgColor }}
                                />
                                <svg
                                    className="w-3.5 h-3.5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            {/* Color picker dropdown */}
                            <AnimatePresence>
                                {showColorPicker && (
                                    <m.div
                                        initial={{
                                            opacity: 0,
                                            y: -8,
                                            scale: 0.95,
                                        }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{
                                            opacity: 0,
                                            y: -8,
                                            scale: 0.95,
                                        }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute bottom-full left-0 mb-2 p-2 bg-white rounded-xl shadow-xl border border-surface-200 flex gap-1.5 z-10"
                                    >
                                        {colorOptions.map((color) => (
                                            <button
                                                key={color.name}
                                                type="button"
                                                title={color.name}
                                                className={`w-7 h-7 rounded-full transition-transform hover:scale-110 ${
                                                    content.bgColor ===
                                                    color.value
                                                        ? "ring-2 ring-primary-500 ring-offset-2"
                                                        : "border-2 border-white shadow-md"
                                                }`}
                                                style={{
                                                    backgroundColor:
                                                        color.value,
                                                }}
                                                onClick={() => {
                                                    setContent({
                                                        ...content,
                                                        bgColor: color.value,
                                                    });
                                                    setShowColorPicker(false);
                                                }}
                                            />
                                        ))}
                                    </m.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Right side - Actions */}
                        <div className="flex items-center gap-2">
                            {/* Discard button - only show if there are changes */}
                            {hasChanges && (
                                <button
                                    type="button"
                                    className="px-3 py-1.5 text-sm font-medium rounded-lg text-surface-600 hover:bg-surface-900/10 transition-colors"
                                    onClick={handleDiscard}
                                >
                                    Discard
                                </button>
                            )}

                            {/* Save/Close button */}
                            <button
                                type="submit"
                                className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition-all ${
                                    isEmpty
                                        ? "bg-surface-900/10 text-surface-600"
                                        : "bg-surface-900/90 text-white hover:bg-surface-900 shadow-md hover:shadow-lg"
                                }`}
                            >
                                {isEmpty
                                    ? "Close"
                                    : isEditing
                                      ? "Save"
                                      : "Add Note"}
                            </button>
                        </div>
                    </div>
                </m.form>
            </LazyMotion>
        </div>
    );
}

export default Dialog;
