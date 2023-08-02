// External imports
import { useState } from "react";
import { db, auth } from "../config/Firebase";
import {
  Button,
  Container,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { deleteDoc, doc, getDoc, Timestamp } from "firebase/firestore";

// Internal imports
import { DeleteIcon } from "./icons/DeleteIcon";
import { EyeIcon } from "./icons/EyeIcon";
import NoteModal from "./NoteModal";

const History = ({ data, setData }) => {
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "datetime",
    direction: "descending",
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const user = auth.currentUser;

  const deleteItem = async (id) => {
    try {
      const docRef = doc(db, "Users", user.uid, "Entries", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await deleteDoc(docRef);
        setData(data.filter((item) => item.id !== id));
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const openModal = (value, date, note) => {
    setSelectedItem({ value, datetime: date, note });
  };

  if (!data) return <Spinner />;

  return (
    <div>
      <Container>
        <Table
          aria-label="Table of Entries"
          sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor}
          color={"secondary"}
        >
          <TableHeader>
            <TableColumn key="value" allowsSorting>
              Score
            </TableColumn>
            <TableColumn key="note" allowsSorting>
              Note
            </TableColumn>
            <TableColumn key="datetime" allowsSorting>
              Date
            </TableColumn>
            <TableColumn key="delete"></TableColumn>
          </TableHeader>
          <TableBody
            items={sortedData}
            loadingState="loaded"
            onLoadMore={() => {}}
          >
            {(item) => (
              <TableRow key={item.id}>
                <TableCell>{item.value}</TableCell>
                <TableCell>{item.note}</TableCell>
                <TableCell>
                  {Timestamp.fromMillis(
                    item.datetime.seconds * 1000 +
                      item.datetime.nanoseconds / 1000000
                  )
                    .toDate()
                    .toLocaleString()}
                </TableCell>
                <TableCell>
                  <TableRow>
                    <TableColumn span={2}>
                      <Tooltip content="Delete Entry">
                        <Button isIconOnly onClick={() => deleteItem(item.id)}>
                          <DeleteIcon />
                        </Button>
                      </Tooltip>
                    </TableColumn>
                    <TableColumn span={1}>
                      <Tooltip content="View">
                        <Button
                          isIconOnly
                          onClick={() => {
                            openModal(item.value, item.datetime, item.note);
                            setVisible(true);
                          }}
                        >
                          <EyeIcon />
                        </Button>
                      </Tooltip>
                    </TableColumn>
                  </TableRow>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {selectedItem && (
          <NoteModal
            data={selectedItem}
            setVisible={setVisible}
            {...bindings}
          />
        )}
      </Container>
    </div>
  );
};

export default History;
