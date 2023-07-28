import { db, auth } from "../config/Firebase";
import {
  Table,
  Button,
  useAsyncList,
  useCollator,
  Loading,
  Container,
  Tooltip,
  Col,
  Row,
  useModal,
} from "@nextui-org/react";
import { Timestamp, deleteDoc, doc, getDoc } from "firebase/firestore";
import { DeleteIcon } from "./icons/DeleteIcon";
import { IconButton } from "./icons/IconButton";
import { EyeIcon } from "./icons/EyeIcon";
import { useEffect, useState } from "react";
import NoteModal from "./NoteModal";

const History = ({ data, setData }) => {
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "datetime",
    direction: "descending",
  });

  const collator = useCollator({ numeric: true });
  const user = auth.currentUser;
  const { setVisible, bindings } = useModal();

  const load = async () => {
    const items = data;
    return { items };
  };

  function sortData(column, direction) {
    setData(
      data.sort((a, b) => {
        const first = a[column];
        const second = b[column];
        let cmp = collator.compare(first, second);
        if (direction === "descending") {
          cmp *= -1;
        }
        return cmp;
      })
    );
  }

  const sortedData = [...data].sort((a, b) => {
    const first = a[sortDescriptor.column];
    const second = b[sortDescriptor.column];

    let cmp = collator.compare(first, second);
    if (sortDescriptor.direction === "descending") {
      cmp *= -1;
    }
    return cmp;
  });

  const deleteItem = async (id) => {
    console.log("deleting " + id);
    try {
      const docRef = doc(db, "Users", user.uid, "Entries", id);
      const docSnap = await getDoc(docRef);

      // Check if document exists before deleting
      if (docSnap.exists()) {
        await deleteDoc(docRef);
        // Update the state
        setData(data.filter((item) => item.id !== id));
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (value, date, note) => {
    setSelectedItem({ value, datetime: date, note });
  };

  return data ? (
    <div>
      <Container>
        <Table
          aria-label="Table of Entries"
          sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor}
        >
          <Table.Header>
            <Table.Column key="value" allowsSorting>
              Score
            </Table.Column>
            <Table.Column key="note" allowsSorting>
              Note
            </Table.Column>
            <Table.Column key="datetime" allowsSorting>
              Date
            </Table.Column>
            <Table.Column key="delete"></Table.Column>
          </Table.Header>
          <Table.Body
            items={sortedData}
            loadingState="loaded"
            onLoadMore={() => {}}
          >
            {(item) => (
              <Table.Row key={item.id}>
                <Table.Cell css={{color:"white"}}>{item.value}</Table.Cell>
                <Table.Cell css={{color:"white"}}>{item.note}</Table.Cell>
                <Table.Cell css={{color:"white"}}>
                  {Timestamp.fromMillis(
                    item.datetime.seconds * 1000 +
                      item.datetime.nanoseconds / 1000000
                  )
                    .toDate()
                    .toLocaleString()}
                </Table.Cell>
                <Table.Cell>
                  <Row>
                    <Col span={2}>
                      <Tooltip content="Delete Entry">
                        <IconButton onClick={() => deleteItem(item.id)}>
                          <DeleteIcon size={20} fill="#FF0080" />
                        </IconButton>
                      </Tooltip>
                    </Col>
                    <Col span={1}>
                      <Tooltip content="Details">
                        <IconButton
                          onClick={() => {
                            openModal(item.value, item.datetime, item.note);
                            setVisible(true);
                          }}
                        >
                          <EyeIcon size={20} fill="#979797" />
                        </IconButton>
                      </Tooltip>
                    </Col>
                  </Row>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
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
  ) : (
    <Loading />
  );
};

export default History;
