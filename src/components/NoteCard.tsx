import Delete from "../assets/Delete";

type Props = {
    onClick: () => void;
    handleDelete: () => void;
} & Note;

function NoteCard({ title, content, bgColor, onClick, handleDelete }: Props) {
    // Format content preview with truncation
    const hasContent = title || content;

    return (
        <div
            className="note-card group relative overflow-hidden"
            style={{ backgroundColor: bgColor }}
            onClick={onClick}
        >
            {/* Decorative corner accent */}
            <div
                className="absolute -top-12 -right-12 w-24 h-24 rounded-full opacity-20 transition-transform duration-300 group-hover:scale-150"
                style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
            />

            {/* Action buttons - appear on hover */}
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0">
                {/* Edit indicator */}
                <span className="p-1.5 rounded-full bg-surface-900/10 text-surface-600">
                    <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                    </svg>
                </span>

                {/* Delete button */}
                <button
                    className="p-1.5 rounded-full bg-surface-900/10 hover:bg-red-500 text-surface-600 hover:text-white transition-all duration-200"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDelete();
                    }}
                    aria-label="Delete note"
                >
                    <Delete className="w-3.5 h-3.5" height={14} width={14} />
                </button>
            </div>

            {/* Content area */}
            <div className="relative z-10 min-h-[80px]">
                {!hasContent ? (
                    <p className="text-surface-500 italic text-sm">
                        Empty note
                    </p>
                ) : (
                    <>
                        {title && (
                            <h3 className="text-base font-semibold text-surface-900 mb-2 line-clamp-2 leading-snug">
                                {title}
                            </h3>
                        )}
                        {content && (
                            <p className="text-surface-700 text-sm leading-relaxed line-clamp-8 whitespace-pre-wrap">
                                {content}
                            </p>
                        )}
                    </>
                )}
            </div>

            {/* Bottom fade for long content */}
            {content && content.length > 200 && (
                <div
                    className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
                    style={{
                        background: `linear-gradient(transparent, ${bgColor})`,
                    }}
                />
            )}
        </div>
    );
}

export default NoteCard;
