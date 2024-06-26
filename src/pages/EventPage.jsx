import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { FormatDateTime } from "../components/FormatDateTime";
import { EditEventForm } from "../components/EditEventForm";
import { ConfirmDeleteModal } from "../components/ConfirmDeleteModal";

export const loader = async ({ params }) => {
  const [eventResponse, categoriesResponse, usersResponse] = await Promise.all([
    fetch(`http://localhost:3000/events/${params.eventId}`),
    fetch("http://localhost:3000/categories"),
    fetch("http://localhost:3000/users"),
  ]);
  const eventData = await eventResponse.json();
  const categoriesData = await categoriesResponse.json();
  const usersData = await usersResponse.json();
  return { event: eventData, categories: categoriesData, users: usersData };
};

export const EventPage = () => {
  const { event, categories, users } = useLoaderData();
  const creator = users.find((user) => user.id === event.createdBy);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const onDelete = async (eventId) => {
    console.log("Deleting event with id:", eventId); 
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("Event deleted successfully");
      setDeleteModalOpen(false);
      window.location.href = '/';
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  };

  const onSave = async (formData) => {
    console.log("Saving event with data:", formData); 
    try {
      const response = await fetch(`http://localhost:3000/events/${event.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("Event saved successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save event:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <>
      <Box key={event.id} borderWidth="1px" borderRadius="lg" p="4" my="2">
        <div key={event.id} className="event">
          <Heading>{event.title}</Heading>
          <p>Description: {event.description}</p>
          <div className="image">
            <Image
              boxSize="4xl"
              objectFit="cover"
              objectPosition="center"
              maxH="sm"
              src={event.image}
            />
          </div>
          {event.categoryIds && event.categoryIds.length > 0 && (
            <p>
              Categories:{" "}
              {event.categoryIds
                .map(
                  (id) =>
                    categories.find((category) => category.id === id)?.name
                )
                .join(", ")}
            </p>
          )}
          <p>Start time of the event: {FormatDateTime(event.startTime)}</p>
          <p>End time of the event: {FormatDateTime(event.endTime)}</p>
          {creator && (
            <div>
              <p>Created by: {creator.name}</p>
              <Image src={creator.image} boxSize="50px" borderRadius="full" />
            </div>
          )}
          <Button onClick={handleEdit}>Edit</Button>
        </div>
      </Box>
      <Modal isOpen={isEditing} onClose={handleCancelEdit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditEventForm event={event} onSave={onSave} onCancel={handleCancelEdit} onDelete={onDelete} /> 
          </ModalBody>
        </ModalContent>
      </Modal>
      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => onDelete(event.id)}
      />
    </>
  );
};
