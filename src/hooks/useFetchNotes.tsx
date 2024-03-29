import { useCallback, useEffect, useState } from "react";
import { getAllNotesOfUser, subscribeToNotesOfUser } from "../utils/firebase";

const useFetchNotes = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchNotes = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await getAllNotesOfUser();
            setNotes(data);
        } catch (error) {
            // Type assertion (not recommended, use type guards instead)
            const typedError = error as Error;
            setError(typedError.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        //Subscribe to note snapshot
        const unsubscribe = subscribeToNotesOfUser((notes) => {
            setNotes(notes);
        });
        return () => {
            unsubscribe();
        };
    }, [fetchNotes]);

    // const invalidate = async () => {
    //     // Reset state
    //     setNotes([]);
    //     setIsLoading(true);
    //     setError(null);
    //     try {
    //         // Fetch fresh data
    //         const data = await getAllNotesOfUser();
    //         setNotes(data);
    //     } catch (error) {
    //         // Type assertion (not recommended, use type guards instead)
    //         const typedError = error as Error;
    //         setError(typedError.message);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    return { notes, isLoading, error };
};

export default useFetchNotes;
