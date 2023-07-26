import { db, auth } from "../config/Firebase";
import {
  Table,
  Button,
  useAsyncList,
  useCollator,
  Loading,
  Container,
} from "@nextui-org/react";
import { Timestamp, deleteDoc, doc, getDoc } from "firebase/firestore";
import { DeleteIcon } from "./icons/DeleteIcon";
import { IconButton } from "./icons/IconButton";
import { useEffect, useState } from "react";

const History = ({ data }) => {
  const collator = useCollator({ numeric: true });
  const user = auth.currentUser;

  const load = async () => {
    const items = data;
    return { items };
  };

  async function sort({ items, sortDescriptor }) {
    return {
      items: items.sort((a, b) => {
        const first = a[sortDescriptor.column];
        const second = b[sortDescriptor.column];
        let cmp = collator.compare(first, second);
        if (sortDescriptor.direction === "descending") {
          cmp *= -1;
        }
        return cmp;
      }),
    };
  }

  const deleteItem = async (id) => {
    try {
      const docRef = doc(db, "Users", user.uid, "Entries", id);
      const docSnap = await getDoc(docRef);

      // Check if document exists before deleting
      if (docSnap.exists()) {
        await deleteDoc(docRef);
        list.update((items) => items.filter((item) => item.id !== id));
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const list = useAsyncList({ load, sort });

  const [isSorted, setIsSorted] = useState(false);

  useEffect(() => {
    if (!isSorted && list.items.length > 0) {
      list.sort({ column: "datetime", direction: "descending" });
      setIsSorted(true);
    }
  }, [isSorted, list.items]);

  return data ? (
    <div>
      <Container>
        <Table
          aria-label="Table of Entries"
          sortDescriptor={list.sortDescriptor}
          onSortChange={list.sort}
        >
          <Table.Header>
            <Table.Column key="value" allowsSorting>
              Score
            </Table.Column>
            <Table.Column key="note" allowsSorting>
              Note
            </Table.Column>
            <Table.Column key="datetime" allowsSorting>
              date
            </Table.Column>
            <Table.Column key="delete"></Table.Column>
          </Table.Header>
          <Table.Body
            items={list.items}
            loadingState={list.loadingState}
            onLoadMore={() => {}}
          >
            {(item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.value}</Table.Cell>
                <Table.Cell>{item.note}</Table.Cell>
                <Table.Cell>
                  {Timestamp.fromMillis(
                    item.datetime.seconds * 1000 +
                      item.datetime.nanoseconds / 1000000
                  )
                    .toDate()
                    .toLocaleString()}
                </Table.Cell>
                <Table.Cell>
                  <Button onPress={() => deleteItem(item.id)}>Delete</Button>
                  {/* <IconButton onPress={() => deleteItem(item.id)}>
                    <DeleteIcon size={20} fill="#FF0080" />
                  </IconButton> */}
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Container>
    </div>
  ) : (
    <Loading />
  );
};

export default History;
