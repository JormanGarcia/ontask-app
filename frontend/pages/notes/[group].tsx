import Card, { CardTitle, CardBody } from "../../components/core/Card";
import { Masonry } from "../../components/core/Masonry";
import { Button } from "../../components/core/Button";
import { useNotesContext } from "../../context/NotesContext";
import { useRouter } from "next/router";
import { FiTrash } from "react-icons/fi";
import { useMutationHook } from "../../hooks/useMutationHook";

const Home = () => {
  const { notes, setNoteValue, filterByGroup, setTitle, refetch } =
    useNotesContext();
  const { DeleteNote } = useMutationHook();
  const {
    query: { group },
  } = useRouter();

  return (
    <>
      <Masonry>
        {(filterByGroup(notes, group!) || []).map((note) => (
          <Card key={note._id}>
            <CardTitle
              value={note.title}
              onChange={(e) => setTitle(note._id, e.target.value)}
            >
              <Button
                onlyIcon
                onClick={() => {
                  DeleteNote(note._id);
                  refetch();
                }}
              >
                <FiTrash />
              </Button>
            </CardTitle>

            <CardBody
              value={note.content}
              onChange={(e) => setNoteValue(e.target.value, note._id)}
            />
          </Card>
        ))}
      </Masonry>
    </>
  );
};

export default Home;
