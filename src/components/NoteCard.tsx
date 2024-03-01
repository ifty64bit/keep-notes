import Delete from "../assets/Delete";

type Props = {
    onClick: () => void;
    handleDelete: () => void;
} & Note;

function NoteCard({ title, content, bgColor, onClick, handleDelete }: Props) {
    return (
        <div
            className="max-w-56 min-w-52 min-h-16 p-2 rounded-md shadow-md cursor-pointer transition-shadow hover:shadow-lg "
            style={{ backgroundColor: bgColor }}
            onClick={onClick}
        >
            <div className="flex justify-end gap-2">
                <Delete
                    className="hover:stroke-red-600 hover:fill-red-600 transition-colors rounded-full"
                    height={20}
                    width={20}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDelete();
                    }}
                />
            </div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p>{content}</p>
        </div>
    );
}

export default NoteCard;
