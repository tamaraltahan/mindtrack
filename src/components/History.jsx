import { useState, useEffect } from "react";
import { where } from "firebase/firestore";
import { db, auth } from "../config/Firebase";
import {
  Table,
  Button,
  useAsyncList,
  useCollator,
  Loading,
  Container,
} from "@nextui-org/react";

const History = ({ data }) => {
  const collator = useCollator({ numeric: true });

  const load = async ({signal}) => {

    // deseminate DB data

  }

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

  const list = useAsyncList({ load, sort });


  return data ? (
    <Container>
      <Table
        aria-label="User Data Table"
        css={{ height: "500px" }}
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
        </Table.Header>
        <Table.Body
          items={list.items}
          loadingState={list.loadingState}
          onLoadMore={() => {}}
        >
          {(item) => <Table.Row key={item.id}></Table.Row>}
        </Table.Body>
      </Table>
    </Container>
  ) : (
    <Loading />
  );
};

export default History;
