import React, { useState } from "react";
import { FormControl, FormLabel, Input, Button, Stack, useToast } from "@chakra-ui/react";
import { FormatDateTime } from "./FormatDateTime";

export const EditEventForm = ({ event, onSave, onCancel, onDelete }) => {
  const [formData, setFormData] = useState({
    title: event.title,
    description: event.description,
    image: event.image,
    startTime: event.startTime,
    endTime: event.endTime,
  });

  const toast = useToast();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSave(formData);
      toast({
        title: "Event Saved",
        description: "Your changes have been saved successfully.",
        status: "success",
        duration: 3000,
        isClosable: true
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save changes. Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true
      });
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete(event.id);
      window.location.href = '/';
    } catch (error) {
      console.error("Failed to delete event: ", error);
    }
  };
  
  

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Image</FormLabel>
          <Input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Start Time</FormLabel>
          <Input
            type="datetime-local"
            name="startTime"
            value={FormatDateTime(formData.startTime, "datetime-local")}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>End Time</FormLabel>
          <Input
            type="datetime-local"
            name="endTime"
            value={FormatDateTime(formData.endTime, "datetime-local")}
            onChange={handleChange}
          />
        </FormControl>
        <Button colorScheme="green" type="submit">Save event</Button>
        <Button onClick={handleDelete} colorScheme="red">Delete event</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </Stack>
    </form>
  );
};