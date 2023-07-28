import { Modal, Button, Text } from "@nextui-org/react";

const NoteModal = ({ data, setVisible, ...bindings }) => {
  if (!data) return null; // Don't render if no data

  // Convert Firebase Timestamp to JavaScript Date
  const date = new Date(data.datetime.seconds * 1000);

  return (
    <div>
      <Modal
        scroll
        width="600px"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...bindings}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            {/* Convert JavaScript Date to string */}
            Posted on {date.toLocaleDateString()}
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text>Score: {data.value}</Text>
          <br />
          <Text id="modal-description">{data.note}</Text>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={() => setVisible(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NoteModal;
