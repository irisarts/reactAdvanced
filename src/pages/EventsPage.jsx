import {
  Button,
  Center,
  Heading,
  Input,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AddEventModal } from "../components/AddEventModal";
import { FormatDateTime } from "../components/FormatDateTime";

export const loader = async () => {
  const events = await fetch("http://localhost:3000/events");
  const categories = await fetch("http://localhost:3000/categories");
  return { events: await events.json(), categories: await categories.json() };
};

export const EventsPage = () => {
  const { events, categories } = useLoaderData();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchWord, setSearchWord] = useState("");
  const handleChange = (event) => setSearchWord(event.target.value);
  const [sportsChoice, setSportsChoice] = useState(false);
  const handleSportsCheck = () => setSportsChoice(!sportsChoice);
  const [gamesChoice, setGamesChoice] = useState(false);
  const handleGamesCheck = () => setGamesChoice(!gamesChoice);
  const [relaxationChoice, setRelaxationChoice] = useState(false);
  const handleRelaxationCheck = () => setRelaxationChoice(!relaxationChoice);
  const createEvent = async (event) => {
    const response = await fetch("http://localhost:3000/events", {
      method: "POST",
      body: JSON.stringify(event),
      headers: { "Content-Type": "application/json;charset=utf-8" },
    });
    event.id = (await response.json()).id;
  };

  const filterCategories = (event) => {
    if (!sportsChoice && !gamesChoice && !relaxationChoice) {
      return true;
    }
    if (
      (sportsChoice && event.categoryIds.includes(1)) ||
      (gamesChoice && event.categoryIds.includes(2)) ||
      (relaxationChoice && event.categoryIds.includes(3))
    ) {
      return true;
    }
    if (
      event.title.toLowerCase().includes(searchWord.toLowerCase()) ||
      event.location.toLowerCase().includes(searchWord.toLowerCase())
    ) {
      return true;
    }

    return false;
  };

  return (
    <>
      <Center>
        <Heading>Events page</Heading>
      </Center>
      <Center>
        <Input
          width="50vw"
          hight="auto"
          placeholder="Search recipes"
          value={searchWord}
          onChange={handleChange}
          size="lg"
        />
      </Center>
      <p>
        <strong>Select your category of choice:</strong>
      </p>
      <p>
        <input
          onChange={handleSportsCheck}
          checked={sportsChoice}
          type="checkbox"
        />
        <span className="slider"> Sports</span>
      </p>
      <p>
        <input
          onChange={handleGamesCheck}
          checked={gamesChoice}
          type="checkbox"
        />
        <span className="slider"> Games</span>
      </p>
      <p>
        <input
          onChange={handleRelaxationCheck}
          checked={relaxationChoice}
          type="checkbox"
        />
        <span className="slider"> Relaxation</span>
      </p>
      <div className="events">
        <Heading>Events</Heading>

        {events &&
          events.filter(filterCategories).map((event) => (
            <div key={event.id} className="event">
              <Link to={`event/${event.id}`}>
                <Heading>{event.title}</Heading>
              </Link>
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
              <p>Start time of the event: {FormatDateTime(event.startTime)}</p>
              <p>End time of the event: {FormatDateTime(event.endTime)}</p>
              <p>
                Categories:{" "}
                {event &&
                  event.categoryIds &&
                  event.categoryIds.map((id) => categories[id - 1].name)}
              </p>
            </div>
          ))}
      </div>
      <Button onClick={onOpen}>Add Event</Button>
      <AddEventModal
        isOpen={isOpen}
        onClose={onClose}
        onCreateEvent={createEvent}
      />
    </>
  );
};
