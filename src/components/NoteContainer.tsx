type Props = {
    children: React.ReactNode;
};

function NoteContainer({ children }: Props) {
    return <div className="flex gap-4 flex-wrap">{children}</div>;
}

export default NoteContainer;
