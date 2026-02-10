type Props = {
    children: React.ReactNode;
};

function NoteContainer({ children }: Props) {
    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
            {children}
        </div>
    );
}

export default NoteContainer;
