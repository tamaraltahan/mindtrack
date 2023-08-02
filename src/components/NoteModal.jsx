import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

const NoteModal = ({ data }) => {
  if (!data) return null; // Don't render if no data

  // Convert Firebase Timestamp to JavaScript Date
  const date = new Date(data.datetime.seconds * 1000);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
      <Modal scroll isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Posted on {date.toLocaleDateString()}
              </ModalHeader>
              <ModalBody>
                <div>
                  <p>Score: {data.value}</p>
                  <p>{data.note}</p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
  );
};

export default NoteModal;
