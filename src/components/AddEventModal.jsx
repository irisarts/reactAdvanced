import {
  Button,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  Input,
  FormLabel,
  Checkbox,
} from "@chakra-ui/react";
import { useState } from "react";

export const AddEventModal = ({ isOpen, onClose, onCreateEvent }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    onCreateEvent({
      title,
      description,
      image,
      location,
      startTime,
      endTime
    });
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>Add Event</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Name Event</FormLabel>
                <Input
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />

                <FormLabel>Description of the event</FormLabel>
                <Input
                  type="description"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />

                <FormLabel>Image of your event</FormLabel>
                <Input
                  type="url"
                  onChange={(e) => setImage(e.target.value)}
                  value={image}
                />

                <FormLabel>Category of your event</FormLabel>
                <Checkbox width="full" value="1">
                  Sports{" "}
                </Checkbox>
                <Checkbox width="full" value="2">
                  Games{" "}
                </Checkbox>
                <Checkbox width="full" value="3">
                  Relaxation{" "}
                </Checkbox>

                <FormLabel>Location of your event</FormLabel>
                <Input
                  type="location"
                  onChange={(e) => setLocation(e.target.value)}
                  value={location}
                />

                <FormLabel>Starttime of your event</FormLabel>
                <Input
                  type="time"
                  onChange={(e) => setStartTime(e.target.value)}
                  value={startTime}
                />

                <FormLabel>Endtime of your event</FormLabel>
                <Input
                  type="time"
                  onChange={(e) => setEndTime(e.target.value)}
                  value={endTime}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3} onClick={onClose}>
                Add Event
              </Button>
              <Button variant="ghost">Close</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
